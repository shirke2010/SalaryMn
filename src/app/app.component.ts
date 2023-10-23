import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {

  constructor(private router : Router){}
 
  onBtnClick(formName:string):void {
    this.router.navigate([`${formName}`])
  }
      
}
