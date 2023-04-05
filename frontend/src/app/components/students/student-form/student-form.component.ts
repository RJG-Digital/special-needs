import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, take, takeUntil } from 'rxjs';
import { ResponseCompanyService } from 'src/app/models/companyServiceModels';
import { RequestStudent, Student } from 'src/app/models/studentModels';
import {
  ResponseStudentService,
  StudentServiceTableMeta,
} from 'src/app/models/studentServiceModels';
import { CompanyServiceService } from 'src/app/services/company-service.service';
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

  public displayedColumns = [
    'assigend',
    'name',
    'color',
    'minutesAssigned',
    'minutesUsed',
    'minutesLeft',
    'actions',
  ];
  public isEdit = false;
  public studentForm: FormGroup;
  public studentServiceForm: FormGroup;
  public companyServices: ResponseCompanyService[];
  public studentServices: ResponseStudentService[];
  public tableStudentServices: StudentServiceTableMeta[];
  public enableEdit = false;
  public selectedIndex = new FormControl(0);
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
    private notificationService: NotificationService,
    private companyServiceService: CompanyServiceService
  ) {}

  ngOnInit(): void {
    this.getCompanyServices();
    this.buidForm();
  }

  public getCompanyServices() {
    this.companyServiceService
      .getServices()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((s) => {
        this.companyServices = s;
      });
  }

  public buidForm() {
    console.log('Company Services: ', this.companyServices);
    console.log('Student: ', this.student);
    if (this.companyServices) {
      this.tableStudentServices = this.companyServices.map((cs) => {
        const foundService = this.student?.services.find(
          (s) => s.service._id === cs._id as any
        );
        console.log('Found Service', foundService)
        return {
          assigned: foundService ? true : false,
          name: cs.name,
          color: cs.color,
          minutesAssigned: foundService?.minutesAssigned
            ? foundService?.minutesAssigned
            : 0,
          minutesUsed: foundService?.minutesUsed
            ? foundService?.minutesUsed
            : 0,
          minutesLeft: foundService?.minutesLeft
            ? foundService?.minutesLeft
            : 0,
          serviceId: cs._id,
          studentServiceId: foundService?._id ? foundService?._id : null 
        };
      });
    }
    console.log('tableServices: ', this.tableStudentServices);
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
        company: this.student ? this.student?.company?._id : '',
        profileImage: this.student ? this.student.profileImage : '',
        gender: this.gender?.value,
        carTag: this.carTag?.value,
        schoolIssuedId: this.schoolIssuedId?.value,
        services: [],
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

  public onCheckChange(event: any, element: any) {
    element.assigned = event.checked;
    console.log('Event check fired: ', event);
    console.log('Element Changed: ', element);
    console.log('Table Data', this.tableStudentServices);
  }

  public saveServices() {
    console.log('Submitting Services: ', this.tableStudentServices);
    if (this.student?._id) {
      this.studentService
        .updateStudentServices(this.student?._id, this.tableStudentServices)
        .pipe(take(1))
        .subscribe((res) => {
          console.log(res);
        });
    }
  }

  public updateMinutes(element: any) {
    element.minutesLeft = element.minutesAssigned - element.minutesUsed;
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
