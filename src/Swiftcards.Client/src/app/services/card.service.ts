import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from '../models/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  public currentCard: Card;

  constructor(private http: HttpClient) { }

  public create(model: any) {
    return this.http.post('api/cards/create', model);
  }

  public update(model: any) {
    return this.http.post('api/cards/update', model);
  }

  public delete(link: string) {
    return this.http.delete('api/cards/delete/' + link);
  }

  public get(link: string) {
    return this.http.get('api/cards/get/' + link);
  }
}
