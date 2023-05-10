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
  newSemester: Semester = new Semester();  // Object to hold form data
  updatedSemester: Semester = new Semester();
  constructor(private semestersService: SemestersService) { }

  ngOnInit() {
    this.getSemesters();
  }

  addSemester(): void {
    this.semestersService.addSemester(this.newSemester).subscribe(semester => {
      this.semesters.push(semester);
      this.newSemester = new Semester();
    });
  }
  updateSemester(): void {
    this.semestersService.updateSemester(this.updatedSemester).subscribe(semester => {
      const index = this.semesters.findIndex(s => s.id === semester.id);
      if (index > -1) {
        this.semesters[index] = semester;
      }
      this.updatedSemester = new Semester();
    });
  }
  selectSemester(semester: Semester): void {
    this.updatedSemester = { ...semester };  // Create a copy to avoid mutating the original object
  }

  getSemesters(): void {
    this.semestersService.getSemesters().subscribe(semesters => this.semesters = semesters);
  }
}
