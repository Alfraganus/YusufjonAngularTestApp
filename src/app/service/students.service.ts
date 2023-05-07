// src/app/service/students.service.ts

// Other imports...
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Student} from "../models/student";

// ...

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private studentsUrl = 'api/students';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentsUrl);
  }

  // Add this new method
  addStudent(newStudent: Student): Observable<Student> {
    return this.http.post<Student>(this.studentsUrl, newStudent, this.httpOptions);
  }

  updateStudent(updatedStudent: Student): Observable<Student> {
    const url = `${this.studentsUrl}/${updatedStudent.id}`;
    return this.http.put<Student>(url, updatedStudent, this.httpOptions);
  }

}
