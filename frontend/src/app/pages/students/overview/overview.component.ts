import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Subject, take, takeUntil } from 'rxjs';
import { StudentFormComponent } from 'src/app/components/students/student-form/student-form.component';
import { Company } from 'src/app/models/companyModels';
import { Student } from 'src/app/models/studentModels';
import { CompanyService } from 'src/app/services/company.service';
import { NotificationService } from 'src/app/services/notification.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit, OnDestroy, AfterViewInit {
  public students: Student[];
  public selectedStudent: Student;
  public company: Company;
  public companyId: string;

  private unsubscribe = new Subject<void>();
  @ViewChild('drawer') drawer: MatDrawer;
  @ViewChild('studentForm') studentForm: StudentFormComponent;
  constructor(
    private studentService: StudentService,
    private companyService: CompanyService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getStudents();
    this.getCompanyId()
  }

  ngAfterViewInit(): void {
    console.log(this.drawer);
  }

  private getStudents() {
    this.studentService.students$
    .pipe(takeUntil(this.unsubscribe))
    .subscribe((s) => (this.students = s));
  }

  private getCompanyId() {
    this.companyService.company$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((company) => { 
        if(company && company._id) {
          this.company = company;
          this.companyId = company._id
        }
      });
  }

  public onStudentEdit(student: Student | null) {
    if (student) {
      // Edit
      this.studentForm.selectedIndex.setValue(0);
      this.studentForm.isEdit = true;
      this.studentForm.student = student;
      this.studentForm.buidForm();
      this.drawer.toggle();
    } else {
      // Add
      this.studentForm.selectedIndex.setValue(0);
      this.studentForm.student = null;
      this.studentForm.isEdit = false;
      console.log('Adding student!');
      this.drawer.toggle();
    }
  }

  public onFlyoutClose(saved:boolean) {
    if(saved) {}
    this.drawer.close();
  }

  public onGetDetails(s: Student) {
    console.log('Details: ', s);
  }

  public onDelete(id: string) {
    this.studentService.deleteStudent(id)
    .pipe(take(1))
    .subscribe((s) => {
      if(s) {
        this.notificationService.success('Student deleted successfully!');
        this.studentService.refreshStudentsList();
      }
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
