import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Student} from "../models/student";

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private studentsUrl = 'api/students';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentsUrl);
  }

  // Add other methods like addStudent, updateStudent, and deleteStudent
}
