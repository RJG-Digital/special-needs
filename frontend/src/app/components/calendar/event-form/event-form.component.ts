import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Student } from 'src/app/models/studentModels';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent implements OnInit, OnDestroy {
  @Input() studentsList: Student[] = [];
  @Input() starDate: Date;
  @Input() endDate: Date;
  @Input() inSubject: string;
  @Input() inLocation: string;
  @Input() inDescription: string;
  @Input() inService: string;
  @Input() inStudent: string;
  @Input() inIsAllDay: boolean;
  @Output() onFormChange = new EventEmitter<FormGroup>();

  public fields: Object = { text: 'studentName', value: 'studentId' };
  public mappedStudents: any;
  public eventForm: FormGroup;

  private unsubscribe = new Subject<void>();

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
    this.startTime?.valueChanges
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(change => {
      this.startTime?.patchValue(this.dateParser(change));
    });
    this.endTime?.valueChanges
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(change => {
      this.endTime?.patchValue(this.dateParser(change));
    });
    this.eventForm.valueChanges
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(form => {
        console.log('Emitting valid form: ', form);
        this.onFormChange.emit(form)
    })
  }

  private buildForm() {
    this.eventForm = this.fb.group({
      subject: [this.inSubject ? this.inSubject :'', [Validators.required]],
      location: [this.inLocation ? this.inLocation : '', [Validators.required]],
      startTime: [this.starDate, [Validators.required]],
      endTime: [this.endDate, [Validators.required]],
      serviceId: [this.inService ? this.inService : '', [Validators.required]],
      studentId: [this.inStudent ? this.inStudent : '', [Validators.required]],
      isAllDay: [this.inIsAllDay ? this.inIsAllDay : false],
      recurrenceRule: [''],
      description: [this.inDescription ? this.inDescription : ''],
    });
  }

  public dateParser(date: any) {
    return new Date(date);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}

