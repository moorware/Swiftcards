import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  styleUrls: [ './header.component.css' ],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

}
