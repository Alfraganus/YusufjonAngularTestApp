// src/app/student/student.component.ts
import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { Course } from '../models/course';
import { StudentsService } from '../service/students.service';
import { InMemoryDataService } from '../in-memory-data.service';

@Component({
  selector: 'app-student-enrollment', // updated component selector
  templateUrl: 'student-enrollment.html',
})
export class StudentEnrollmentComponent implements OnInit { // updated component class name
  students: Student[];
  courses: Course[];
  courseStudentsMap: Map<number, Student[]> = new Map();

  constructor(
    private studentsService: StudentsService,
    private inMemoryDataService: InMemoryDataService
  ) {}

  async  ngOnInit() {
    await this.getStudents()
    this.getCourses();
    this.createCourseStudentsMap();
  }

  async getStudents(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.studentsService.getStudents().subscribe((students) => {
        this.students = students;
        resolve();
      });
    });
  }

  getCourses(): void {
    this.courses = this.inMemoryDataService.createDb().courses;
  }

  createCourseStudentsMap(): void {
    console.log('createCourseStudentsMap() called');
    const enrollments = this.inMemoryDataService.createDb().enrollments;
    console.log('enrollments:', enrollments);
    console.log('students:', this.students);
    enrollments.forEach((enrollment) => {
      const { courseId, studentId } = enrollment;
      const student = this.students.find((s) => s.id === studentId);
      if (!this.courseStudentsMap.has(courseId)) {
        this.courseStudentsMap.set(courseId, [student]);
      } else {
        this.courseStudentsMap.get(courseId).push(student);
      }
    });
  }


}
