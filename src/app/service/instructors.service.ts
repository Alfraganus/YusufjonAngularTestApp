import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Instructor} from "../models/instructor";

@Injectable({
  providedIn: 'root',
})
export class InstructorsService {
  private instructorsUrl = 'api/instructors';

  constructor(private http: HttpClient) {}

  addInstructor(instructor: Instructor): Observable<Instructor> {
    return this.http.post<Instructor>(this.instructorsUrl, instructor);
  }

  updateInstructor(instructor: Instructor): Observable<any> {
    return this.http.put(this.instructorsUrl, instructor);
  }

  deleteInstructor(id: number): Observable<Instructor> {
    const url = `${this.instructorsUrl}/${id}`;
    return this.http.delete<Instructor>(url);
  }

  getInstructors(): Observable<Instructor[]> {
    return this.http.get<Instructor[]>(this.instructorsUrl);
  }

  // Add other methods like addInstructor, updateInstructor, and deleteInstructor
}
