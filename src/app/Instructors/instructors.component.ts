import { Component, OnInit } from '@angular/core';
import { Instructor } from '../models/instructor';
import { InstructorsService } from '../service/instructors.service';

@Component({
  selector: 'app-instructors',
  templateUrl: 'instructors.component.html',
})

export class InstructorsComponent implements OnInit {
  instructors: Instructor[];

  constructor(private instructorsService: InstructorsService) { }

  ngOnInit() {
    this.getInstructors();
  }

  getInstructors(): void {
    this.instructorsService.getInstructors().subscribe(instructors => this.instructors = instructors);
  }
}
