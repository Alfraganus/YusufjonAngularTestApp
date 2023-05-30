// src/app/course/course.component.ts
import { Component, OnInit } from '@angular/core';
import { Course } from '../models/course';
import {CoursesService} from "../service/courses.service";
import {Observable} from "rxjs";
import {Instructor} from "../models/instructor";

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
  searchTerm: string;
  sortKey: string;
  sortReverse: boolean = false;



  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
    this.getCourses();
  }

  sort(key) {
    if (this.sortKey === key) {
      this.sortReverse = !this.sortReverse;
    } else {
      this.sortReverse = false;
    }
    this.sortKey = key;
  }
  sortedCourses() {
    return this.courses.sort((a, b) => {
      if (a[this.sortKey] < b[this.sortKey]) return this.sortReverse ? 1 : -1;
      if (a[this.sortKey] > b[this.sortKey]) return this.sortReverse ? -1 : 1;
      return 0;
    });
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
  getCourses(): void {
    this.coursesService.getCourses().subscribe(courses => this.courses = courses);
  }

  protected readonly parseInt = parseInt;
}
