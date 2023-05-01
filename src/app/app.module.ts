import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";
import {InstructorsService} from "./service/instructors.service";
import {CoursesService} from "./service/courses.service";
import {SemestersService} from "./service/semesters.service";
import {InstructorsComponent} from "./Instructors/instructors.component";
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
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

const appRoutes: Routes = [
  { path: '', component: InstructorsComponent, canActivate: [AuthGuard] },
  { path: 'course', component: CourseComponent },
  { path: 'semester', component: SemestersComponent },
  { path: 'student', component: StudentsComponent },
  { path: 'taught-course', component: TaughtCoursesComponent },
  { path: 'student-enrollment', component: StudentEnrollmentComponent },
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
  ],
  providers: [InstructorsService, CoursesService, StudentsService, SemestersService,InMemoryDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
