// src/app/course/course.component.ts
import { Component, OnInit } from '@angular/core';
import { Course } from '../models/course';
import {CoursesService} from "../service/courses.service";

@Component({
  selector: 'app-course',
  templateUrl: 'course.component.html',
})
export class CourseComponent implements OnInit {
  courses: Course[];

  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
    this.getCourses();
  }

  getCourses(): void {
    this.coursesService.getCourses().subscribe(courses => this.courses = courses);
  }
}
