import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-student-service-widgit',
  templateUrl: './student-service-widgit.component.html',
  styleUrls: ['./student-service-widgit.component.scss']
})
export class StudentServiceWidgitComponent implements OnInit {
  @Input() currentViewStudents:any[];
  @ViewChild(MatAccordion) accordion: MatAccordion;
  public isExpanded = false;

  public displayedColumns: string[] = [
    'service',
    'minUsed',
    'minLeft',
  ];

  ngOnInit(): void {
    console.log(this.currentViewStudents);
  }

  public toggleAccordion() {
    this.isExpanded = !this.isExpanded;
    this.isExpanded ? this.accordion.openAll() : this.accordion.closeAll();
  }
}
