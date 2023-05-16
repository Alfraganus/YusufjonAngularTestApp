// src/app/course/course.component.ts
import { Component, OnInit } from '@angular/core';
import { Course } from '../models/course';
import {CoursesService} from "../service/courses.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-course',
  templateUrl: 'course.component.html',
})
export class CourseComponent implements OnInit {
  courses: Course[];
  editCourse: Course | null = null;
  filteredCourses: Course[];
  nameFilter = '';
  codeFilter = '';
  creditValueFilter = '';
  responsibleDepartmentFilter = '';
  sortOrder: string[] = ['id'];

  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
    this.getCourses();
  }

  applyFilters(): void {
    this.filteredCourses = this.courses.filter(course =>
      course.name.toLowerCase().includes(this.nameFilter.toLowerCase()) &&
      course.code.toLowerCase().includes(this.codeFilter.toLowerCase()) &&
      course.creditValue.toString().includes(this.creditValueFilter) &&
      course.responsibleDepartment.toLowerCase().includes(this.responsibleDepartmentFilter.toLowerCase())
    );
    this.sortFilteredCourses();
  }

  sortFilteredCourses(): void {
    this.filteredCourses.sort((a, b) => {
      for (const key of this.sortOrder) {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
      }
      return 0;
    });
  }

  setSortOrder(order: string[]): void {
    this.sortOrder = order;
    this.sortFilteredCourses();
  }
  createCourse(name: string, code: string, creditValue: number, responsibleDepartment: string): void {
    name = name.trim();
    code = code.trim();
    responsibleDepartment = responsibleDepartment.trim();

    if (!name || !code || !creditValue || !responsibleDepartment) { return; }

    this.coursesService.addCourse({ name, code, creditValue, responsibleDepartment } as Course)
      .subscribe(course => {
        this.courses.push(course);
      });
  }
  updateCourse(course: Course): void {
    this.coursesService.updateCourse(course).subscribe(() => {
      this.courses = this.courses.map(c => c.id === course.id ? course : c);
      this.editCourse = null;
    });
  }

  toggleEditForm(course: Course | null): void {
    this.editCourse = course;
  }

  getCourses(): void {
    this.coursesService.getCourses().subscribe(courses => this.courses = courses);
  }

  protected readonly parseInt = parseInt;
}
