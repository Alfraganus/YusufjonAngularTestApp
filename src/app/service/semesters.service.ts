import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Semester} from "../models/semester";

@Injectable({
  providedIn: 'root',
})
export class SemestersService {
  private semestersUrl = 'api/semesters';

  constructor(private http: HttpClient) {}

  getSemesters(): Observable<Semester[]> {
    return this.http.get<Semester[]>(this.semestersUrl);
  }
  addSemester(semester: Semester): Observable<Semester> {
    return this.http.post<Semester>(this.semestersUrl, semester);
  }

  updateSemester(semester: Semester): Observable<Semester> {
    return this.http.put<Semester>(`${this.semestersUrl}/${semester.id}`, semester);
  }

  // Add other methods like addSemester, updateSemester, and deleteSemester
}
