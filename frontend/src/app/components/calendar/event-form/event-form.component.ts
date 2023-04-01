import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from 'src/app/models/studentModels';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent implements OnInit, OnDestroy {
  @Input() studentsList: Student[] = [];
  public fields: Object = { text: 'studentName', value: 'studentId' };
  public mappedStudents: any;
  public eventForm: FormGroup;

  get subject(){return this.eventForm.get('subject');}
  get location(){return this.eventForm.get('location');}
  get startTime(){return this.eventForm.get('startTime');}
  get endTime(){return this.eventForm.get('endTime');}
  get serviceId(){return this.eventForm.get('serviceId');}
  get studentId(){return this.eventForm.get('studentId');}
  get isAllDay(){return this.eventForm.get('isAllDay');}
  get recurrenceRule(){return this.eventForm.get('recurrenceRule');}
  get description(){return this.eventForm.get('description');}

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
    if(this.studentsList && this.studentsList.length) {
      this.mappedStudents = this.studentsList.map(s => {return {studentName: `${s.firstName} ${s.lastName}`, studentId: s._id  }})
    }
  }

  private buildForm() {
    this.eventForm = this.fb.group({
      subject: ['', [Validators.required]],
      location: ['', [Validators.required]],
      startTime: [null, [Validators.required]],
      endTime: [null, [Validators.required]],
      serviceId: ['', [Validators.required]],
      studentId: ['', [Validators.required]],
      isAllDay: [false],
      recurrenceRule: [''],
      description: [''],
    });
  }

  public dateParser(date: any) {
    return new Date(date);
  }

  ngOnDestroy(): void {}
}

