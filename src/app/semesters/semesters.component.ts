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

  constructor(private semestersService: SemestersService) { }

  ngOnInit() {
    this.getSemesters();
  }

  getSemesters(): void {
    this.semestersService.getSemesters().subscribe(semesters => this.semesters = semesters);
  }
}
