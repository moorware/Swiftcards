import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HideService {
  public hide: boolean = false;

  constructor() { }
}
