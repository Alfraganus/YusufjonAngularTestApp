// instructors.component.ts
import { Component, OnInit } from '@angular/core';
import { Instructor } from '../models/instructor';
import { InstructorsService } from '../service/instructors.service';
import { FormBuilder, FormGroup,ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-instructors',
  templateUrl: 'instructors.component.html',
})


export class InstructorsComponent implements OnInit {
  instructors: Instructor[];
  filteredInstructors: Instructor[];
  sortKey: keyof Instructor;
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private instructorsService: InstructorsService, private fb: FormBuilder) { }

  instructorForm: FormGroup;
  selectedInstructor: Instructor;

  onEdit(instructor: Instructor) {
    this.selectedInstructor = instructor;
    this.instructorForm.patchValue(instructor);
  }

  createInstructorForm() {
    this.instructorForm = this.fb.group({
      neptunCode: '',
      name: '',
      email: '',
      position: '',
    });
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
