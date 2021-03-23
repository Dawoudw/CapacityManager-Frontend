
import { IssueService } from 'src/app/services/issue.service';
import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { UsersService } from 'src/app/services/users.service';
import { LocactionComponent } from '../locaction/locaction.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private issueServ: IssueService,
    public dialog: MatDialog,
    public userServ: UsersService
  ) {}
  RecentlyClosed = [];
  RecentlyOpened = [];
  AssignedIssues = [];
  isRecentlyOpenedLaoded = false;
  isRecentlyClosedLaoded = false;
  isAssignedIssuesLaoded = false;
  ngOnInit() {
    console.log('getRecentlyOpened', this.RecentlyOpened);
    this.getRecentIssues();
    console.log('getRecentlyClosed', this.RecentlyClosed);
  }

  async getRecentIssues() {
    await this.issueServ
      .getRecentlyOpened()
      .then((res) => {
        this.isRecentlyOpenedLaoded = false;
        this.RecentlyOpened = res;
      })
      .then(() => {
        this.isRecentlyOpenedLaoded = true;
      });
    await this.issueServ
      .getRecentlyClosed()
      .then((res) => {
        this.isRecentlyClosedLaoded = false;
        this.RecentlyClosed = res;
      })
      .then(() => {
        this.isRecentlyClosedLaoded = true;
      });
    await this.issueServ
      .getIssuesByAssignedUser(this.userServ.getCurrentUser()?.username)
      .then((res) => {
        this.isAssignedIssuesLaoded = false;
        this.AssignedIssues = res;
      })
      .then(() => {
        this.isAssignedIssuesLaoded = true;
      });
  }
  async openNewDialog(issue) {
    //  let selected = JSON.parse(JSON.stringify(this.getSelecetdIssues()));

    const dialogRef = this.dialog.open(LocactionComponent, {
      data: {
        // selectedIssues: this.getSelecetdIssues(),

        issue: issue,
      },
      height: '100%',
      width: '100%',
      panelClass: ['mat-dialog-container'],
      disableClose: true,
      position: { bottom: '50px' },
    });
    // dialogRef
    //   .afterClosed()
    //   .toPromise()
    //   .then((res) => {
    //     console.log('dialogRef', res);
    //     if (res?.changed) this.getIssues();
    //   });
  }
}
