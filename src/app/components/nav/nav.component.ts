import { UsersService } from './../../services/users.service';
import { CommonService } from './../../services/common.service';
import { Component, HostListener, OnInit, AfterViewInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit, AfterViewInit {
  CurrentUser: any;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  pageName;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    public userServ: UsersService,
    private comnServ: CommonService
  ) {}
  ngAfterViewInit(): void {
    if (!this.CurrentUser) {
      this.CurrentUser = this.userServ.getCurrentUser()?.username;
    }
  }

  ngOnInit() {
    //   this.userServ
    //     .getCurrentUser()
    //     .then((res) => (this.CurrentUser = res.username))
    //     .catch(() => (this.CurrentUser = ''));

    // this.CurrentUser = this.userServ.getCurrentUser()?.username;
    this.comnServ.navigationChange.subscribe((nav) => {
      nav ? (this.pageName = nav) : '';
    });
    this.userServ.userChange.subscribe((usr) => {
      this.CurrentUser = usr?.username;
    });
  }
}
