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
  constructor(private semestersService: SemestersService) { }

  ngOnInit() {
    this.getSemesters();
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
