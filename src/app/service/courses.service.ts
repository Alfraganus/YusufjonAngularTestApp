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

  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.coursesUrl, course);
  }
  updateCourse(course: Course): Observable<any> {
    const url = `${this.coursesUrl}/${course.id}`;
    return this.http.put(url, course);
  }
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.coursesUrl);
  }

}
