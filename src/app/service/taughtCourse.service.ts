// taught-course.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {TaughtCourse} from "../models/TaughtCourse";
import {Student} from "../models/student";

@Injectable({
  providedIn: 'root',
})
export class TaughtCourseService {
  private taughtCoursesUrl = 'api/taughtCourses';

  constructor(private http: HttpClient) {}

  getTaughtCourses(instructorId: number, semesterId: number): Observable<TaughtCourse[]> {
    return this.http.get<TaughtCourse[]>(this.taughtCoursesUrl);
  }

  // Add other methods like addTaughtCourse, updateTaughtCourse, and deleteTaughtCourse
}
