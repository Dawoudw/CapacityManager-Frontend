import { CommonService } from 'src/app/services/common.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { UsersService } from './services/users.service';
import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnChanges {
  title = 'Capacity Management';
  constructor(
    private userSrv: UsersService,
    private router: Router,
    private comnServ: CommonService
  ) {
    router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((val) => {
        comnServ.navigationChange.emit(val['url']);
      });
    // router.events.subscribe((val) => {
    //   // see also

    // });
  }
  ngOnChanges(changes: SimpleChanges): void {}
}
