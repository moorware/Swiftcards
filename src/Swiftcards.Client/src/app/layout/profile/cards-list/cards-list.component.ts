import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { WaitService } from 'src/app/services/wait.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';
import { CardService } from 'src/app/services/card.service';
import { Card } from 'src/app/models/card';
import { Router } from '@angular/router';
import { Link } from 'src/app/models/link';
import { LinkDialogComponent } from '../link-dialog/link-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-cards-list',
  styleUrls: ['./cards-list.component.css'],
  templateUrl: './cards-list.component.html'
})
export class CardsListComponent implements OnInit {
  @Output() onZeroCreate = new EventEmitter();
  @Output() isEditing = new EventEmitter<boolean>();

  public editing: boolean = false;
  public editingCard: Card;

  constructor(
    public userService: UserService,
    public waitService: WaitService,
    private cardService: CardService,
    private router: Router,
    private clipboard: Clipboard,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  trackByIndex(index: number): any {
    return index;
  }

  onOpen(card: Card) {
    this.cardService.currentCard = card;
    this.router.navigate([card.link]);
  }

  onCopyURL(link: string) {
    this.clipboard.copy(window.location.origin + '/' + link);

    this.snackBar.open('Link copied to clipboard!', null, {
      duration: 2000,
    });

    return;
  }

  onEdit(card: Card) {
    this.editingCard = Object.assign({}, card);
    this.editingCard.links = [];

    var i;
    for (i = 0; i < card.links.length; i++) {
      this.editingCard.links[i] = Object.assign({}, card.links[i]);
    }

    this.editing = true;
    this.isEditing.emit(this.editing);
  }

  onDelete(cardIndex: number) {

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      disableClose: true,
      data: this.userService.currentUser.cards[cardIndex].name
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isEditing.emit(true);
        this.waitService.loading = true;

        this.cardService.delete(this.userService.currentUser.cards[cardIndex].link).subscribe(() => {
          this.userService.currentUser.cards.splice(cardIndex, 1);

          this.waitService.loading = false;
          this.isEditing.emit(false);
        }, (error: HttpErrorResponse) => {
          this.waitService.loading = false;

          if (error.status === 400 || error.status === 404)
            this.userService.logOut();
        })
      }
    });
  }

  onLinkOpen(url: string) {
    if (!url.startsWith('http://') && !url.startsWith('https://'))
      url = 'http://' + url;

    window.open(url, '_blank');
  }

  editLink(linkIndex: number, editForm: NgForm) {
    if (!this.waitService.loading) {

      let edit = true;

      if (this.editingCard.links.length === linkIndex) {
        edit = false;
      }

      const dialogRef = this.dialog.open(LinkDialogComponent, {
        width: '300px',
        disableClose: true,
        data: { model: edit ? Object.assign({}, this.editingCard.links[linkIndex]) : new Link(), edit: edit }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (result.model)
            this.editingCard.links[linkIndex] = result.model;
          else
            this.editingCard.links.splice(linkIndex, 1);

          this.validateLinksForm(editForm);
        }
      });
    }
  }

  validateLinksForm(editForm: NgForm) {
    if (this.editingCard.links.length < 1)
      editForm.control.setErrors({ 'incorrect': true });
    else
      editForm.control.setErrors(null);
  }

  onCancel() {
    this.editingCard = null;
    this.editing = false;
    this.isEditing.emit(this.editing);
  }

  onSave(cardIndex: number) {
    this.waitService.loading = true;

    this.cardService.update(this.editingCard).subscribe(() => {
      this.userService.currentUser.cards[cardIndex] = Object.assign({}, this.editingCard);
      this.userService.currentUser.cards[cardIndex].links = [];

      var i;
      for (i = 0; i < this.editingCard.links.length; i++) {
        this.userService.currentUser.cards[cardIndex].links[i] = Object.assign({}, this.editingCard.links[i]);
      }

      this.waitService.loading = false;

      this.editingCard = null;
      this.editing = false;
      this.isEditing.emit(this.editing);
    }, (error: HttpErrorResponse) => {
      this.waitService.loading = false;

      if (error.status === 404)
        this.userService.logOut();
    });
  }

}
