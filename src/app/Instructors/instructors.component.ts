// instructors.component.ts
import {Component, OnInit} from '@angular/core';
import {Instructor} from '../models/instructor';
import {InstructorsService} from '../service/instructors.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CoursesService} from "../service/courses.service";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-instructors',
  templateUrl: 'instructors.component.html',
})


export class InstructorsComponent implements OnInit {
  instructors: Instructor[];
  filteredInstructors: Instructor[];
  sortKey: keyof Instructor;
  sortDirection: 'asc' | 'desc' = 'asc';
  hasAdmin: boolean;
  currentUser: any;
  constructor(private instructorsService: InstructorsService, private fb: FormBuilder, private userService: AuthService) {
    this.userService.currentUser$.subscribe(user => {
      this.currentUser = user;
      console.log(this.currentUser)
    });
  }

  instructorForm: FormGroup;
  selectedInstructor: Instructor;

  onEdit(instructor: Instructor) {
    this.selectedInstructor = instructor;
    this.instructorForm.patchValue(instructor);
  }

  createInstructorForm() {
    this.instructorForm = this.fb.group({
      neptunCode: ['', [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z0-9]{5}$')]],
      name: '',
      email: '',
      position: '',
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




  onSave() {
    if (this.selectedInstructor) {
      const updatedInstructor = {
        ...this.selectedInstructor,
        ...this.instructorForm.value
      };
      this.instructorsService.updateInstructor(updatedInstructor).subscribe(() => {
        this.getInstructors();
        this.selectedInstructor = null;
        this.instructorForm.reset();
      });
    } else {
      this.instructorsService.addInstructor(this.instructorForm.value).subscribe(() => {
        this.getInstructors();
        this.instructorForm.reset();
      });
    }
  }

  ngOnInit() {
    this.getInstructors();
    this.createInstructorForm();
    this.checkIfAdmin();
  }

  getInstructors(): void {
    this.instructorsService.getInstructors().subscribe(instructors => {
      this.instructors = instructors;
      this.filteredInstructors = [...instructors];
    });
  }

  onFilterChange(value: string, key: keyof Instructor) {
    this.filteredInstructors = this.instructors.filter(instructor => {
      return instructor[key].toString().toLowerCase().includes(value.toLowerCase());
    });
  }

  onDelete(id: number) {
    this.instructorsService.deleteInstructor(id).subscribe(() => {
      this.getInstructors();
    });
  }

  onSortChange(key: keyof Instructor) {
    if (this.sortKey === key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortDirection = 'asc';
    }
    this.filteredInstructors.sort((a, b) => {
      if (a[this.sortKey] < b[this.sortKey]) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (a[this.sortKey] > b[this.sortKey]) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
}
