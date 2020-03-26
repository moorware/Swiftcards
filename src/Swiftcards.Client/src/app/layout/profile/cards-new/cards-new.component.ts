import { Component, OnInit, HostListener, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Link } from '../../../models/link';
import { NgForm } from '@angular/forms';
import { CardService } from 'src/app/services/card.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { WaitService } from 'src/app/services/wait.service';
import { Card } from 'src/app/models/card';
import { LinkDialogComponent } from '../link-dialog/link-dialog.component';

@Component({
  selector: 'app-cards-new',
  styleUrls: ['./cards-new.component.css'],
  templateUrl: './cards-new.component.html'
})
export class CardsNewComponent implements OnInit {
  public origin: string = window.location.origin;
  
  public model: Card = new Card();
  public mobile: boolean;

  @ViewChild('linksForm') linksForm: NgForm;
  @ViewChild('linkForm') linkForm: NgForm;

  @Output() isEditing = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    public waitService: WaitService,
    private cardService: CardService,
    private userService: UserService,
    public dialog: MatDialog
  ) {
    this.onResize();
  }

  ngOnInit(): void {

  }

  editLink(i) {
    if (!this.waitService.loading) {

      let edit = true;

      if (this.model.links.length === i) {
        edit = false;
      }

      const dialogRef = this.dialog.open(LinkDialogComponent, {
        width: '300px',
        disableClose: true,
        data: { model: edit ? Object.assign({}, this.model.links[i]) : new Link(), edit: edit }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (result.model)
            this.model.links[i] = result.model;
          else
            this.model.links.splice(i, 1);

          this.validateLinksForm();
        }
      });
    }
  }

  onStepperSelectionChange(event: any) {
    if (event.selectedIndex == 2)
      this.validateLinksForm();
  }

  validateLinksForm() {
    if (this.model.links.length < 1)
      this.linksForm.control.setErrors({ 'incorrect': true });
    else
      this.linksForm.control.setErrors(null);
  }

  onSubmit() {
    if (this.linkForm.valid) {
      this.isEditing.emit(true);
      this.waitService.loading = true;

      this.cardService.create(this.model).subscribe(() => {
        this.userService.currentUser.cards.unshift(this.model);
        this.cardService.currentCard = this.model;

        this.waitService.loading = false;
        this.isEditing.emit(false);
        this.router.navigate([this.model.link]);
      }, (error: HttpErrorResponse) => {
        this.waitService.loading = false;
        this.isEditing.emit(false);

        if (error.status === 400) {
          this.linkForm.controls['link'].enable();
          this.linkForm.controls['link'].setErrors({ 'linkTaken': true });
        }
        else if (error.status === 404)
          this.userService.logOut();


      });
    }
  }

  onLinkChange() {
    if (this.linkForm.controls['link'].hasError('linkTaken'))
      this.linkForm.controls['link'].setErrors({ 'linkTaken': false });
  }

  @HostListener('window:resize')
  onResize() {
    this.mobile = window.innerWidth <= 800;
  }

}
