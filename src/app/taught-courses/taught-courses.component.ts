import { Component, OnInit } from '@angular/core';
import { Instructor } from '../models/instructor';
import { Semester } from '../models/semester';
import { Course } from '../models/course';
import {TaughtCourse} from "../models/TaughtCourse";
import {TaughtCourseService} from "../service/taughtCourse.service";
import {InstructorsService} from "../service/instructors.service";
import {SemestersService} from "../service/semesters.service";
import {CoursesService} from "../service/courses.service";

@Component({
  selector: 'app-taught-courses',
  templateUrl: './taught-courses.component.html',
})
export class TaughtCoursesComponent implements OnInit {
  taughtCourses: TaughtCourse[] = [];
  instructors: Instructor[] = [];
  semesters: Semester[] = [];
  courses: Course[] = [];

  selectedInstructorId: number ;
  selectedSemesterId: number | null = null;

  constructor(
    private taughtCourseService: TaughtCourseService,
    private instructorsService: InstructorsService,
    private semestersService: SemestersService,
    private coursesService: CoursesService
  ) {
  }

  ngOnInit(): void {
    this.getInstructors();
    this.getSemesters();
    this.getCourses();
  }

  getInstructors(): void {
    this.instructorsService
      .getInstructors()
      .subscribe((instructors) => (this.instructors = instructors));
  }

  getSemesters(): void {
    this.semestersService
      .getSemesters()
      .subscribe((semesters) => (this.semesters = semesters));
  }

  getCourses(): void {
    this.coursesService
      .getCourses()
      .subscribe((courses) => (this.courses = courses));
  }
  getTaughtCourses(instructorId: number, semesterId: number): void {
    console.log('getTaughtCourses() called with instructorId:', instructorId, 'semesterId:', semesterId);
    this.taughtCourseService
      .getTaughtCourses(instructorId, semesterId)
      .subscribe({
        next: (taughtCourses) => {
          console.log('getTaughtCourses() next:', taughtCourses);
          const filteredCourses = taughtCourses.filter(
            (tc) => tc.instructorId === Number(instructorId) && tc.semesterId === Number(semesterId)
          );
          console.log('getTaughtCourses() filtered courses:', filteredCourses);
          this.taughtCourses = filteredCourses;
        },
        error: (err) => {
          console.log('getTaughtCourses() error:', err);
        },
        complete: () => {
          console.log('getTaughtCourses() complete');
        }
      });
  }
  getTaughtCourses2(instructorId: number, semesterId: number): void {
    console.log('getTaughtCourses() called with instructorId:', instructorId, 'semesterId:', semesterId);
    this.taughtCourseService
      .getTaughtCourses(instructorId, semesterId)
      .subscribe({
        next: (taughtCourses) => {
          console.log('getTaughtCourses() next:', taughtCourses);
          this.taughtCourses = taughtCourses.filter(
            (tc) => tc.instructorId === instructorId && tc.semesterId === semesterId
          );
          // this.taughtCourses = taughtCourses;
        },
        error: (err) => {
          console.log('getTaughtCourses() error:', err);
        },
        complete: () => {
          console.log('getTaughtCourses() complete');
        }
      });
  }

  onInstructorChange(instructorId: number): void {
    // console.log('changed'+instructorId)
    this.selectedInstructorId = instructorId;
    if (this.selectedSemesterId != null) {
      this.getTaughtCourses(this.selectedInstructorId, this.selectedSemesterId);
    }
  }

  onSemesterChange(semesterId: number): void {
    // console.log('semester '+semesterId)
    this.selectedSemesterId = semesterId;
    if (this.selectedInstructorId) {
       this.getTaughtCourses(this.selectedInstructorId, this.selectedSemesterId);
    }
  }

  getCourseName(courseId: number,column:string): string {
    const course = this.courses.find((c) => c.id === courseId);
    switch (column) {
      case 'name' :
        return course.name;
      case 'code' :
        return course.code;
      case 'creditValue' :
        return course.creditValue.toString();
      case 'responsibleDepartment' :
        return course.responsibleDepartment;
    }
    return course ? course.name : '';
  }

}
