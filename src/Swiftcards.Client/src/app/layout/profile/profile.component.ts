import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { HideService } from 'src/app/services/hide.service';
import { User } from 'src/app/models/user';
import { HttpErrorResponse } from '@angular/common/http';
import { WaitService } from 'src/app/services/wait.service';

@Component({
  selector: 'app-profile',
  styleUrls: ['./profile.component.css'],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  public tabIndex: number = 0;
  public editing: boolean = false;

  constructor(
    private router: Router,
    public userService: UserService,
    public waitService: WaitService,
    private hideService: HideService
  ) {
    this.hideService.hide = false;
    if (!this.userService.currentUser) {
      this.router.navigate(['signin']);
    }

    if (this.userService.currentUser.name === '')
      this.waitService.loading = true;
  }

  ngOnInit(): void {
    this.userService.get().subscribe((user: User) => {
      this.userService.currentUser = user;
      this.waitService.loading = false;
    }, () => {
      this.waitService.loading = false;
      this.onLogOut();
    });
  }

  onLogOut() {
    this.userService.logOut();
  }

  onZeroCreate() {
    this.tabIndex = 1;
  }

  isEditingChanged(editing: boolean) {
    this.editing = editing;
  }

}
