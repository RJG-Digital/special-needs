import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/userModels';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {
  @Input() users: User[]
  public displayedColumns: string[] = ['name', 'title', 'role', 'email', 'actions'];
  public dataSource: any[] = []

  ngOnInit(): void {}
}