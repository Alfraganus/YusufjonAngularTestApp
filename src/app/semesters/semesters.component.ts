// src/app/semesters/semesters.component.ts
import { Component, OnInit } from '@angular/core';
import { Semester } from '../models/semester';
import {SemestersService} from "../service/semesters.service";

@Component({
  selector: 'app-semesters',
  templateUrl: './semesters.component.html',
})
export class SemestersComponent implements OnInit {
  semesters: Semester[];
  selectedSemester: Semester = new Semester();  // Object to hold form data
  editing = false;
  sortKey: string = '';
  sortReverse: boolean = false;
  constructor(private semestersService: SemestersService) { }

  ngOnInit() {
    this.getSemesters();
  }
  sort(key) {
    if (this.sortKey === key) {
      this.sortReverse = !this.sortReverse;
    } else {
      this.sortReverse = false;
    }
    this.sortKey = key;
    this.semesters.sort(this.compare);
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
  compare = (a, b) => {
    if (a[this.sortKey] < b[this.sortKey]) return this.sortReverse ? 1 : -1;
    if (a[this.sortKey] > b[this.sortKey]) return this.sortReverse ? -1 : 1;
    return 0;
  }
  saveSemester(): void {
    if (this.editing) {
      this.updateSemester();
    } else {
      this.addSemester();
    }
  }

  addSemester(): void {
    this.semestersService.addSemester(this.selectedSemester).subscribe(semester => {
      this.semesters.push(semester);
      this.selectedSemester = new Semester();
    });
  }
  sortedSemesters() {
    let semesters = [...this.semesters]; // create a copy of the semesters array

    // sort the semesters
    return semesters.sort((a, b) => {
      if (a[this.sortKey] < b[this.sortKey]) return this.sortReverse ? 1 : -1;
      if (a[this.sortKey] > b[this.sortKey]) return this.sortReverse ? -1 : 1;
      return 0;
    });
  }
  updateSemester(): void {
    this.semestersService.updateSemester(this.selectedSemester).subscribe(() => {
      const index = this.semesters.findIndex(s => s.id === this.selectedSemester.id);
      if (index > -1) {
        this.semesters[index] = this.selectedSemester;
      }
      this.selectedSemester = new Semester();
      this.editing = false;
    }, error => {
      console.error('An error occurred while updating the semester: ', error);
    });
  }





  selectSemester(semester: Semester): void {
    this.selectedSemester = { ...semester };  // Create a copy to avoid mutating the original object
    this.editing = true;
  }

  getSemesters(): void {
    this.semestersService.getSemesters().subscribe(semesters => this.semesters = semesters);
  }
}
