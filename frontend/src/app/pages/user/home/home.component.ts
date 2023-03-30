import { Component, OnDestroy, OnInit } from '@angular/core';
import { View } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy  {
  
  public view: View = 'WorkWeek';

  constructor() {}
  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

}
