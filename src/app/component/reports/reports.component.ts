import { Component } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {

  constructor(private router : Router){}

  closeElement(){
    this.router.navigateByUrl('')
  }

}
