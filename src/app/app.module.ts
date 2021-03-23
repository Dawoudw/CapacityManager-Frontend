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
import { TableComponent } from './components/table/table.component';

import { EditIssuesComponent } from './components/edit-issues/edit-issues.component';

import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';

import { CommonService } from './services/common.service';

// Imported by Jian Qiu on 1.29.2021
import { NewIssuePopupComponent } from './components/dialogs/new-issue-popup/new-issue-popup.component';
import { IssueService } from './services/issue.service';
import { ReactiveFormsModule } from '@angular/forms';

import { RemarksService } from './services/remarks.service';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';

import { GalleryComponent } from './components/gallery/gallery.component';
import { LocactionComponent } from './components/locaction/locaction.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';

import { MatNativeDateModule } from '@angular/material/core';
import { DemoMaterialModule } from './modules/mterials/mterials.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { SideTreeComponent } from './components/side-tree/side-tree.component';
import { ProjectsComponent } from './components/projects/projects.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    TableComponent,

    EditIssuesComponent,
    NewIssuePopupComponent,
    LoginComponent,
    RegistrationComponent,
    GalleryComponent,
    LocactionComponent,
    SideNavComponent,
    SideTreeComponent,
    ProjectsComponent,
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
