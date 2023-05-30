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
  sortKey: string = '';
  sortDirection: number = 1;  // 1 for ascending, -1 for descendin
  constructor(private studentsService: StudentsService) {}

  onSubmit(form: NgForm): void {
    const newStudent: Student = form.value;
    this.studentsService.addStudent(newStudent).subscribe((student) => {
      this.students.push(student); // Add the newly created student to the list
      form.reset(); // Reset the form after successful submission
    });
  }
  sort(key: string): void {
    if (this.sortKey === key) {
      this.sortDirection = -this.sortDirection;
    } else {
      this.sortKey = key;
      this.sortDirection = 1;
    }
  }

  // Add this method
  sortedStudents(): Student[] {
    return this.students.sort((a, b) => {
      if (a[this.sortKey] < b[this.sortKey]) {
        return -1 * this.sortDirection;
      }
      if (a[this.sortKey] > b[this.sortKey]) {
        return 1 * this.sortDirection;
      }
      return 0;
    });
  }
  onUpdate(form: NgForm, studentId: number): void {
    const updatedStudent: Student = { ...form.value, id: studentId };
    this.studentsService.updateStudent(updatedStudent).subscribe((updated) => {
      const index = this.students.findIndex((s) => s.id === updated.id);
      this.students[index] = updated;
    });
  }
  checkIfAdmin() {
    var registered_users = localStorage.getItem('currentUser');

    if(registered_users) {
      var userObject = JSON.parse(registered_users);
      // Check if userObject is not null, roles exist and it's an array
      if(userObject && userObject.roles && Array.isArray(userObject.roles) && userObject.roles.includes('admin')) {
        console.log(registered_users);
        console.log(userObject.roles.includes('admin'));
        return true;
      }
    }
    return false;
  }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.studentsService.getStudents().subscribe((students) => (this.students = students));
  }
}
