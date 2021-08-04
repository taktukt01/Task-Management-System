import { FullscreenOverlayContainer } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IsLoggedInGuard } from './is-logged-in.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskComponent } from './task/task.component';
import { TaskguardGuard } from './taskguard.guard';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';

const routes: Routes = [

  //default route
  {
    path: '',  
    component: LoginComponent,
    canActivate:[IsLoggedInGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    // user can active route only if this guard is true. == if user is logged in , then they can access 
    canActivate:[TaskguardGuard]
  },
  {
    path:'detail',
    component:TaskDetailComponent,
    canActivate:[TaskguardGuard]

  },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  // },
  {
    path: 'register',  // can only register if not signed in
    component: RegistrationComponent,
    canActivate:[IsLoggedInGuard]
  },
  //invalid route
  {
    path:'**',  
    component:DashboardComponent,
    canActivate:[TaskguardGuard]

  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
