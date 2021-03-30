import { UsersService } from './services/users.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';


import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';

import { CommonService } from './services/common.service';

// Imported by Jian Qiu on 1.29.2021
import { IssueService } from './services/issue.service';
import { ReactiveFormsModule } from '@angular/forms';

import { RemarksService } from './services/remarks.service';
import { SideNavComponent } from './components/side-nav/side-nav.component';

import { MatNativeDateModule } from '@angular/material/core';
import { DemoMaterialModule } from './modules/mterials/mterials.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { SideTreeComponent } from './components/side-tree/side-tree.component';
import { ExpansionMenuComponent } from './components/expansion-menu/expansion-menu.component';
import { LocationsTreeComponent } from './components/locations-tree/locations-tree.component';
import {TreeviewModule} from "ngx-treeview";
import { LocationComponent } from './components/location/location.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    SideNavComponent,
    SideTreeComponent,
    ExpansionMenuComponent,
    LocationsTreeComponent,
    LocationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    DemoMaterialModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    TreeviewModule.forRoot(),
  ],



  providers: [
    CommonService,
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' },
    },
    IssueService,
    RemarksService,
    UsersService,
  ],
  bootstrap: [  AppComponent,NavComponent],
})
export class AppModule {}
