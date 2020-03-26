import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WaitService {
  public loading: boolean = false;

  constructor() { }
}
