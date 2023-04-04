import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, take, takeUntil } from 'rxjs';
import { RequestStudent, Student } from 'src/app/models/studentModels';
import { NotificationService } from 'src/app/services/notification.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent implements OnInit, OnDestroy {
  @Input() student: Student | null;
  @Input() companyId: string | null;
  @Output() onClose = new EventEmitter();

  public isEdit = false;
  public studentForm: FormGroup;
  private unsubscribe = new Subject<void>();

  get firstName() {
    return this.studentForm.get('firstName');
  }
  get lastName() {
    return this.studentForm.get('lastName');
  }
  get email() {
    return this.studentForm.get('email');
  }
  get teacher() {
    return this.studentForm.get('teacher');
  }
  get homeroomNumber() {
    return this.studentForm.get('homeroomNumber');
  }
  get grade() {
    return this.studentForm.get('grade');
  }
  get profileImage() {
    return this.studentForm.get('profileImage');
  }
  get gender() {
    return this.studentForm.get('gender');
  }
  get carTag() {
    return this.studentForm.get('carTag');
  }
  get schoolIssuedId() {
    return this.studentForm.get('schoolIssuedId');
  }

  constructor(
    private studentService: StudentService,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.buidForm();
  }

  public buidForm() {
    console.log(this.student);
    this.studentForm = this.fb.group({
      firstName: [
        this.student?.firstName ? this.student.firstName : '',
        [Validators.required],
      ],
      lastName: [
        this.student?.lastName ? this.student.lastName : '',
        [Validators.required],
      ],
      email: [
        this.student?.email ? this.student.email : '',
        [Validators.email],
      ],
      teacher: [
        this.student?.teacher ? this.student.teacher : '',
        [Validators.required],
      ],
      homeroomNumber: [
        this.student?.homeroomNumber ? this.student.homeroomNumber : '',
        [Validators.required],
      ],
      grade: [
        this.student?.grade ? this.student.grade : '',
        [Validators.required],
      ],
      company: [this.student?.company ? this.student.company._id : ''],
      profileImage: [
        this.student?.profileImage ? this.student.profileImage : '',
      ],
      gender: [this.student?.gender ? this.student.gender : ''],
      carTag: [this.student?.carTag ? this.student.carTag : ''],
      schoolIssuedId: [
        this.student?.schoolIssuedId ? this.student.schoolIssuedId : '',
      ],
    });
  }

  public close() {
    this.studentForm.reset();
    this.onClose.emit(false);
  }

  public onSubmit() {
    if (this.studentForm.valid) {
      const student: RequestStudent = {
        firstName: this.firstName?.value,
        lastName: this.lastName?.value,
        teacher: this.teacher?.value,
        email: this.email?.value,
        homeroomNumber: this.homeroomNumber?.value,
        grade: this.grade?.value,
        company:  this.student ? this.student?.company?._id : '',
        profileImage: this.student ? this.student.profileImage : '',
        gender: this.gender?.value,
        carTag: this.carTag?.value,
        schoolIssuedId: this.schoolIssuedId?.value,
      };
      if (this.student && this.student.company && this.student.company._id) {
        student.company = this.student.company._id;
      } else if (this.companyId) {
        student.company = this.companyId;
      }
      if (this.isEdit) {
        if (this.student) {
          this.studentService
            .updateStudent(this.student._id, student)
            .pipe(take(1))
            .subscribe((s: RequestStudent) => {
              if (s) {
                console.log('Updated: ', s);
                this.notificationService.success('Student saved successfully.');
                this.studentService.refreshStudentsList();
                this.studentForm.reset();
                this.close();
              }
            });
        }
      } else {
        this.studentService
          .createStudent(student)
          .pipe(take(1))
          .subscribe((s: RequestStudent) => {
            if (s) {
              this.notificationService.success('Student saved successfully.');
              this.studentService.refreshStudentsList();
              this.studentForm.reset();
              this.close();
            }
          });
      }
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
