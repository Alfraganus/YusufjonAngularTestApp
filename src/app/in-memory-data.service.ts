import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Instructor } from './models/instructor';
import { Course } from './models/course';
import { Student } from './models/student';
import { Semester } from './models/semester';
import {TaughtCourse} from "./models/TaughtCourse";
import {Enrollment} from "./models/enrollment";

export class InMemoryDataService implements InMemoryDbService {

  addEnrollment(enrollment: Enrollment) {
    const db = this.createDb();
    db.enrollments.push(enrollment);
    return db;
  }

  createDb() {
    const instructors: Instructor[] = [
      { id: 1, neptunCode: 'A123', name: 'John Doe', email: 'john.doe@example.com', position: 'associate professor' },
      { id: 2, neptunCode: 'A124', name: 'Jane Smith', email: 'jane.smith@example.com', position: 'assistant professor' },
      { id: 3, neptunCode: 'A125', name: 'Bob Johnson', email: 'bob.johnson@example.com', position: 'lecturer' },


    ];

    const courses: Course[] = [
      { id: 1, name: 'Computer Science', code: 'CS101', creditValue: 4, responsibleDepartment: 'VIRT' },
      { id: 2, name: 'Discrete Mathematics', code: 'DM102', creditValue: 3, responsibleDepartment: 'Mathematics' },
    ];

    const students: Student[] = [
      { id: 1, neptunCode: 'S123', name: 'Alice', email: 'alice@example.com', department: 'Computer Engineer Msc' },
      { id: 2, neptunCode: 'S124', name: 'Bob', email: 'bob@example.com', department: 'Computer Programmer Bsc' },
    ];


    const semesters: Semester[] = [
      { id: 1, name: '2022/23/1', startDate: new Date('2022-09-01'), endDate: new Date('2023-01-31') },
      { id: 2, name: '2022/23/2', startDate: new Date('2023-02-01'), endDate: new Date('2023-06-30') },
    ];
    const taughtCourses: TaughtCourse[] = [
      { id: 1, instructorId: 1, courseId: 2, semesterId: 1 },
      { id: 2, instructorId: 1, courseId: 2, semesterId: 1 },
      { id: 3, instructorId: 2, courseId: 1, semesterId: 2 },
    ];

    const enrollments: Enrollment[] = [
      { id: 1, studentId: 1, courseId: 1, semesterId: 2 },
      { id: 2, studentId: 1, courseId: 2, semesterId: 1 },
      { id: 3, studentId: 2, courseId: 1, semesterId: 1 },
    ];
    return {instructors, courses, students, semesters,taughtCourses,enrollments };
  }
}
