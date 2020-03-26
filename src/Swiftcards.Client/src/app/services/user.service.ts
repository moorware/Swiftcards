import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public currentUser: User;

  constructor(
    private router: Router,
    private http: HttpClient
    ) { }

  public get() {
    return this.http.get('api/profile/get');
  }

  public logOut() {
    localStorage.removeItem('auth_token');
    this.currentUser = null;
    this.router.navigate(['']);
  }
}
