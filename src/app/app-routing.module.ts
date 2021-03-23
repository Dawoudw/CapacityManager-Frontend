import { ProjectsComponent } from './components/projects/projects.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

import { ActivateGuard } from './services/activate.guard';
import { GalleryComponent } from './components/gallery/gallery.component';
import { LocactionComponent } from './components/locaction/locaction.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'locations', component: LocactionComponent },
  { path: 'projects', component: ProjectsComponent },
  {
    path: 'documents',
    component: GalleryComponent ,
    children: [
      {
        path: '#id',
        component: GalleryComponent,
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  // { path: 'issues', canActivate: [ActivateGuard], component: IssuesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
