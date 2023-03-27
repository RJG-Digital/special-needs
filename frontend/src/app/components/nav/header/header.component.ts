import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/userModels';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  @Input() user: User

  constructor() {}
  
  ngOnInit(): void {}

}
