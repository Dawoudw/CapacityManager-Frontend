import { Router } from '@angular/router';
import { UsersService } from './services/users.service';
import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Capacity Management';
  constructor(private userSrv: UsersService, private router: Router) {}

}
