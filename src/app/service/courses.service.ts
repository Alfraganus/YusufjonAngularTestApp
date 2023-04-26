import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Course} from "../models/course";

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private coursesUrl = 'api/courses';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.coursesUrl);
  }

  // Add other methods like addCourse, updateCourse, and deleteCourse
}
