import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../../models/user';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { WaitService } from 'src/app/services/wait.service';
import { HideService } from 'src/app/services/hide.service';

export class AuthenticateModel {
  public name: string = '';
  public password: string = '';
}

@Component({
  selector: 'app-signin',
  styleUrls: ['../auth.css'],
  templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {
  public error: string = null;
  public model: AuthenticateModel = new AuthenticateModel();

  constructor(
    private router: Router,
    public waitService: WaitService,
    private authService: AuthService,
    private userService: UserService,
    private hideService: HideService
    ) {
      this.hideService.hide = false;
      
      if (this.userService.currentUser) {
        this.router.navigate(['me']);
      }
    }

  ngOnInit(): void {
    
  }

  onSubmit() {
    this.waitService.loading = true;

    this.authService.signIn(this.model).subscribe((data: any) => {
      localStorage.setItem('auth_token', data.token);

      this.userService.get().subscribe((user: User) => {
        this.userService.currentUser = user;
        this.router.navigate(['me']);
        this.waitService.loading = false;
      }, () => {
        this.userService.currentUser = null;
        this.waitService.loading = false;
      });
    }, (error: HttpErrorResponse) => {
      if (error.status === 400)
        this.error = `Username or password is incorrect!`;

        this.waitService.loading = false;
    });
  }

  onChange() {
    if (this.error)
      this.error = null;
  }
}
