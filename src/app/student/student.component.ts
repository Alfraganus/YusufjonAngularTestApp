// src/app/student/student.component.ts
import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import {StudentsService} from "../service/students.service";

@Component({
  selector: 'app-students',
  templateUrl: './student.component.html',
})
export class StudentsComponent implements OnInit {
  students: Student[];

  constructor(private studentsService: StudentsService) {}

  ngOnInit() {
    this.getStudents();
  }

  getStudents(): void {
    this.studentsService.getStudents().subscribe((students) => (this.students = students));
  }
}
