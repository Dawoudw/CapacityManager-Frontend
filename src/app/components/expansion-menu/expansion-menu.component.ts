import { CommonService } from 'src/app/services/common.service';
import { Router } from '@angular/router';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
const LOCATION = `<svg xmlns="http://www.w3.org/2000/svg" ><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
`;
@Component({
  selector: 'app-expansion-menu',
  templateUrl: './expansion-menu.component.html',
  styleUrls: ['./expansion-menu.component.css'],
})
export class ExpansionMenuComponent implements OnInit {
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    public router: Router,
    private comnServ: CommonService
  ) {
    iconRegistry.addSvgIconLiteral(
      'location',
      sanitizer.bypassSecurityTrustHtml(LOCATION)
    );
  }
  @ViewChild(MatAccordion) accordion: MatAccordion;
  ngOnInit(): void {}

  navigate(val) {
    // this.comnServ.navigationChange.emit(val);
    this.router.navigate([`/${val}`]);
  }
}
