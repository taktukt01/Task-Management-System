import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Routing/Components for Task 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskComponent } from './task/task.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { HttpClientModule } from '@angular/common/http';
// Angular Material
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { FilterPipe } from './filter.pipe';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TaskDetailComponent,
    TaskComponent,
    UpdateTaskComponent,
    LoginComponent,
    RegistrationComponent,
    PageNotFoundComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSliderModule,
    BrowserAnimationsModule,
    MatTableModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    MatToolbarModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
