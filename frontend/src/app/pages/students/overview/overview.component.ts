import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Subject, takeUntil } from 'rxjs';
import { Company } from 'src/app/models/companyModels';
import { Student } from 'src/app/models/studentModels';
import { CompanyService } from 'src/app/services/company.service';
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

  constructor(
    private studentService: StudentService,
    private companyService: CompanyService
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
    } else {
      // Add
      console.log('Adding student!');
      this.drawer.toggle();
    }
  }

  public onFlyoutClose(saved:boolean) {
    if(saved) {}
    this.drawer.close();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
