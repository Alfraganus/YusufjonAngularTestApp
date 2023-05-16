import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InstructorsService} from "./service/instructors.service";
import {CoursesService} from "./service/courses.service";
import {SemestersService} from "./service/semesters.service";
import {InstructorsComponent} from "./Instructors/instructors.component";
import {RouterModule, Routes} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {InMemoryDataService} from "./in-memory-data.service";
import {HttpClientInMemoryWebApiModule, InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {AuthGuard} from "./auth.guard";
import {HeaderComponent} from "./header/header.component";
import {CourseComponent} from "./course/course.component";
import {SemestersComponent} from "./semesters/semesters.component";
import {StudentsComponent} from "./student/student.component";
import {StudentsService} from "./service/students.service";
import {TaughtCoursesComponent} from "./taught-courses/taught-courses.component";
import {StudentEnrollmentComponent} from "./student-enrollment/student.enrollment";
import {RegisterComponent} from "./register/RegisterComponent";
import {AuthInterceptorService} from "../auth-interceptor.service";

const appRoutes: Routes = [
  { path: '', component: InstructorsComponent, canActivate: [AuthGuard] },
  { path: 'course', component: CourseComponent, canActivate: [AuthGuard] },
  { path: 'semester', component: SemestersComponent, canActivate: [AuthGuard] },
  { path: 'student', component: StudentsComponent, canActivate: [AuthGuard] },
  { path: 'taught-course', component: TaughtCoursesComponent, canActivate: [AuthGuard] },
  { path: 'student-enrollment', component: StudentEnrollmentComponent, canActivate: [AuthGuard] },
  { path: 'register-component', component: RegisterComponent},
  { path: 'login', component: LoginComponent },
  // other routes
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TaughtCoursesComponent,
    StudentsComponent,
    CourseComponent,
    SemestersComponent,
    RegisterComponent,
    HeaderComponent,
    StudentEnrollmentComponent,
    InstructorsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService),
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
  ],
  providers: [InstructorsService, CoursesService, StudentsService, SemestersService,InMemoryDataService,{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
