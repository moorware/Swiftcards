import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { HideService } from 'src/app/services/hide.service';

@Component({
  selector: 'app-home',
  styleUrls: [ './home.component.css' ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
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

}
