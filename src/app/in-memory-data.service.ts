import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Instructor } from './models/instructor';
import { Course } from './models/course';
import { Student } from './models/student';
import { Semester } from './models/semester';
import {TaughtCourse} from "./models/TaughtCourse";
import {Enrollment} from "./models/enrollment";

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const instructors: Instructor[] = [
      { id: 1, neptunCode: 'A123', name: 'John Doe', email: 'john.doe@example.com', position: 'associate professor' },
      { id: 2, neptunCode: 'A124', name: 'Jane Smith', email: 'jane.smith@example.com', position: 'assistant professor' },
      { id: 3, neptunCode: 'A125', name: 'Bob Johnson', email: 'bob.johnson@example.com', position: 'lecturer' },
      { id: 4, neptunCode: 'A126', name: 'Alice Lee', email: 'alice.lee@example.com', position: 'research assistant' },
      { id: 5, neptunCode: 'A127', name: 'David Kim', email: 'david.kim@example.com', position: 'associate professor' },
      { id: 6, neptunCode: 'A128', name: 'Emily Chen', email: 'emily.chen@example.com', position: 'assistant professor' },
      { id: 7, neptunCode: 'A129', name: 'Michael Wong', email: 'michael.wong@example.com', position: 'lecturer' },
      { id: 8, neptunCode: 'A130', name: 'Sara Davis', email: 'sara.davis@example.com', position: 'research assistant' },
      { id: 9, neptunCode: 'A131', name: 'William Brown', email: 'william.brown@example.com', position: 'associate professor' },
      { id: 10, neptunCode: 'A132', name: 'Linda Taylor', email: 'linda.taylor@example.com', position: 'assistant professor' },
      { id: 11, neptunCode: 'A133', name: 'Richard Lee', email: 'richard.lee@example.com', position: 'lecturer' },
      { id: 12, neptunCode: 'A134', name: 'Megan Smith', email: 'megan.smith@example.com', position: 'research assistant' },
      { id: 13, neptunCode: 'A135', name: 'Alex Johnson', email: 'alex.johnson@example.com', position: 'associate professor' },
      { id: 14, neptunCode: 'A136', name: 'Karen Davis', email: 'karen.davis@example.com', position: 'assistant professor' },
      { id: 15, neptunCode: 'A137', name: 'Chris Lee', email: 'chris.lee@example.com', position: 'lecturer' },
      { id: 16, neptunCode: 'A138', name: 'Julia Brown', email: 'julia.brown@example.com', position: 'research assistant' },
      { id: 17, neptunCode: 'A139', name: 'Thomas Wang', email: 'thomas.wang@example.com', position: 'associate professor' },
      { id: 18, neptunCode: 'A140', name: 'Laura Chen', email: 'laura.chen@example.com', position: 'assistant professor' },
      { id: 19, neptunCode: 'A141', name: 'Steven Kim', email: 'steven.kim@example.com', position: 'lecturer' },
      { id: 20, neptunCode: 'A142', name: 'Amanda Johnson', email: 'amanda.johnson@example.com', position: 'research assistant' },
      { id: 21, neptunCode: 'A143', name: 'Erica Davis', email: 'erica.davis@example.com', position: 'associate professor' },

      // more instructors
    ];

    const courses: Course[] = [
      { id: 1, name: 'Computer Science', code: 'CS101', creditValue: 4, responsibleDepartment: 'VIRT' },
      { id: 2, name: 'Discrete Mathematics', code: 'DM102', creditValue: 3, responsibleDepartment: 'Mathematics' },
      // more courses
    ];

    const students: Student[] = [
      { id: 1, neptunCode: 'S123', name: 'Alice', email: 'alice@example.com', department: 'Computer Engineer Msc' },
      { id: 2, neptunCode: 'S124', name: 'Bob', email: 'bob@example.com', department: 'Computer Programmer Bsc' },
      // more students
    ];

    const semesters: Semester[] = [
      { id: 1, name: '2022/23/1', startDate: new Date('2022-09-01'), endDate: new Date('2023-01-31') },
      { id: 2, name: '2022/23/2', startDate: new Date('2023-02-01'), endDate: new Date('2023-06-30') },
      // more semesters
    ];
    const taughtCourses: TaughtCourse[] = [
      { id: 1, instructorId: 1, courseId: 2, semesterId: 1 },
      { id: 2, instructorId: 1, courseId: 2, semesterId: 1 },
      { id: 3, instructorId: 2, courseId: 1, semesterId: 2 },
      // more taught courses
    ];

    const enrollments: Enrollment[] = [
      { id: 1, studentId: 1, courseId: 1, semesterId: 1 },
      { id: 2, studentId: 1, courseId: 2, semesterId: 1 },
      { id: 3, studentId: 2, courseId: 1, semesterId: 1 },
      // more enrollments
    ];
    return {instructors, courses, students, semesters,taughtCourses,enrollments };
  }
}
