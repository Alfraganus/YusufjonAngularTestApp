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

  // Add other methods like addSemester, updateSemester, and deleteSemester
}
