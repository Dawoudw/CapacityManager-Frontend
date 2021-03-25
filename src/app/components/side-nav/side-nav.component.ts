import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent implements OnInit {
  options: FormGroup;

  constructor(fb: FormBuilder, private router: Router) {
    this.options = fb.group({
      bottom: 0,
      fixed: false,
      top: 0,
    });
  }
  onTabChanged(event: MatTabChangeEvent): void {
    switch (event.index) {
      case 0:
        this.router.navigate(['/locations']);
        break;
      case 1:
        this.router.navigate(['/projects']);

        break;
    }
  }
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some((h) =>
    h.test(window.location.host)
  );

  ngOnInit(): void {}
}
