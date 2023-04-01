import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from 'src/app/models/studentModels';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss']
})
export class StudentsTableComponent {
  @Input() students: Student[]
  @Output() onStudentEdit = new EventEmitter<Student | null>();
  public displayedColumns: string[] = ['name', 'teacher', 'grade', 'homeroomNumber', 'actions'];

  public studentEdit(student = null) {
    this.onStudentEdit.emit(student);
  }
}
