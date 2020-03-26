import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  public signIn(model: any) {
    return this.http.post('api/auth/signin', model);
  }

  public signUp(model: any) {
    return this.http.post('api/auth/signup', model);
  }
}
