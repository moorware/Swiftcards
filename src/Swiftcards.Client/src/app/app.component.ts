import { Component } from '@angular/core';
import { WaitService } from './services/wait.service';
import { HideService } from './services/hide.service';
import { UserService } from './services/user.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'swiftcards-client';

  constructor(
    public waitService: WaitService,
    public hideService: HideService,
    private userService: UserService
  ) {
    if (localStorage.getItem('auth_token'))
      this.userService.currentUser = new User();
  }
}
