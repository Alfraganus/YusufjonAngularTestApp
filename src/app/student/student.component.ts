// src/app/student/student.component.ts

import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { StudentsService } from '../service/students.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-students',
  templateUrl: './student.component.html',
})
export class StudentsComponent implements OnInit {
  students: Student[];
  editingStates: Map<number, boolean> = new Map<number, boolean>(); // Add this line
  constructor(private studentsService: StudentsService) {}

  onSubmit(form: NgForm): void {
    const newStudent: Student = form.value;
    this.studentsService.addStudent(newStudent).subscribe((student) => {
      this.students.push(student); // Add the newly created student to the list
      form.reset(); // Reset the form after successful submission
    });
  }

  onUpdate(form: NgForm, studentId: number): void {
    const updatedStudent: Student = { ...form.value, id: studentId };
    this.studentsService.updateStudent(updatedStudent).subscribe((updated) => {
      const index = this.students.findIndex((s) => s.id === updated.id);
      this.students[index] = updated;
    });
  }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.studentsService.getStudents().subscribe((students) => (this.students = students));
  }
}
