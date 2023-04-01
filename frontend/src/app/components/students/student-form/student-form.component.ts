import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { RequestStudent, Student } from 'src/app/models/studentModels';
import { NotificationService } from 'src/app/services/notification.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent implements OnInit, OnDestroy {
  @Input() student: Student;
  @Input() companyId: string | null;
  @Output() onClose = new EventEmitter();

  public studentForm: FormGroup;

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

  private buidForm() {
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
        company: '',
        profileImage: '',
        gender: this.gender?.value,
        carTag: this.carTag?.value,
        schoolIssuedId: this.schoolIssuedId?.value,
      };
      if (this.student && this.student.company && this.student.company._id) {
        student.company = this.student.company._id;
      } else if (this.companyId) {
        student.company = this.companyId;
      }

      this.studentService
        .createStudent(student)
        .pipe(take(1))
        .subscribe((s: RequestStudent) => {
          if (s) {
            this.notificationService.success('Student saved successfully.');
            this.studentService.refreshStudentsList();
            this.studentForm.reset();
          }
        });
    }
  }

  ngOnDestroy(): void {}
}
