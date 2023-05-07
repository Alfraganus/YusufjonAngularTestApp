// src/app/student/student.component.ts
import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { Course } from '../models/course';
import { StudentsService } from '../service/students.service';
import { InMemoryDataService } from '../in-memory-data.service';
import {Semester} from "../models/semester";

@Component({
  selector: 'app-student-enrollment', // updated component selector
  templateUrl: 'student-enrollment.html',
})
export class StudentEnrollmentComponent implements OnInit { // updated component class name
  students: Student[];
  courses: Course[];
  semesters: Semester[];
  filteredCourses: Course[];
  courseStudentsMap: Map<number, Student[]> = new Map();

  constructor(
    private studentsService: StudentsService,
    private inMemoryDataService: InMemoryDataService
  ) {}

  async  ngOnInit() {
    await this.getStudents()
    this.getCourses();
    this.createCourseStudentsMap();
    this.filteredCourses = this.courses;
  }

  async getStudents(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.studentsService.getStudents().subscribe((students) => {
        this.students = students;
        resolve();
      });
    });
  }

  onFilterChange(value: string, column: string): void {
    if (!value) {
      this.filteredCourses = this.courses;
    } else {
      value = value.toLowerCase();
      if (column === 'courseName') {
        this.filteredCourses = this.courses.filter(course => course.name.toLowerCase().includes(value));
      } else if (column === 'semester') {
        this.filteredCourses = this.courses.filter(course => {
          const semester = this.findSemesterByCourse(course.id);
          return semester && semester.name.toLowerCase().includes(value);
        });
      } else if (column === 'students') {
        this.filteredCourses = this.courses.filter(course => {
          const students = this.courseStudentsMap.get(course.id);
          return students && students.some(student => student.name.toLowerCase().includes(value));
        });
      }
    }
  }

  getCourses(): void {
    this.courses = this.inMemoryDataService.createDb().courses;
  }
  getSemesters(): void {
    this.semesters = this.inMemoryDataService.createDb().semesters;
  }
  findSemesterByCourse(courseId: number): Semester | undefined {
    const db = this.inMemoryDataService.createDb();
    const enrollment = db.enrollments.find((e) => e.courseId === courseId);
    if (enrollment) {
      return db.semesters.find((s) => s.id === enrollment.semesterId);
    }
    return undefined;
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
