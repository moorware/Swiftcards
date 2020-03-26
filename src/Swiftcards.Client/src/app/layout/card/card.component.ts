import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HideService } from 'src/app/services/hide.service';
import { WaitService } from 'src/app/services/wait.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  public card: Card;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cardService: CardService,
    private hideService: HideService,
    private waitService: WaitService
  ) {
    this.hideService.hide = true;
  }

  ngOnInit(): void {
    if (this.cardService.currentCard) {
      this.card = this.cardService.currentCard;
      this.cardService.currentCard = null;
    }
    else {
      this.waitService.loading = true;
      this.cardService.get(this.activatedRoute.snapshot.params['link']).subscribe((data: Card) => {
        this.card = data;
        this.waitService.loading = false;
      }, () => {
        this.router.navigate(['']);
        this.waitService.loading = false;
      });

    }
  }

  onLinkOpen(url) {
    if (!url.startsWith('http://') && !url.startsWith('https://'))
      url = 'http://' + url;

    window.open(url, '_blank');
  }

}
