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

  getInstructors(): Observable<Instructor[]> {
    return this.http.get<Instructor[]>(this.instructorsUrl);
  }

  // Add other methods like addInstructor, updateInstructor, and deleteInstructor
}
