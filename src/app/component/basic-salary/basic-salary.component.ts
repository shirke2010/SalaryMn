import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {BasicSalaryCreateComponent} from '../basic-salary-create/basic-salary-create.component';
import { ApiService } from '../../services/api.service';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { __values } from 'tslib';

import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-basic-salary',
  templateUrl: './basic-salary.component.html',
  styleUrls: ['./basic-salary.component.scss']
})

export class BasicSalaryComponent implements OnInit{

  title = 'basicSalary';
  displayedColumns: string[] = ['employeeId', 'basicAmount', 'approvedBy', 'date', 'applicableFromDate','applicableTillDate','nextBasicAmount','CVNo','action'];
  dataSource!: MatTableDataSource<any>;
    
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog : MatDialog, private api : ApiService, private router : Router){}

  ngOnInit():void{
    this.getAllBasicSalary();
  }

  getAllBasicSalary(){
    this.api.getBasicSalary()
    .subscribe({
        next:(res)=>{
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort
        },
        error:(error)=>{
          alert('error while fetching the record !!')
        }
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openBasicSalaryCreate(){
      this.dialog.open(BasicSalaryCreateComponent, {
        width:'30%'
    }).afterClosed().subscribe(val=>{
        if(val==='save'){
          this.getAllBasicSalary();
        }
    })
  }

  editBasicSalary(row:any){
    this.dialog.open(BasicSalaryCreateComponent,{
      width:'30%',
      data:row
  }).afterClosed().subscribe(val=>{
    if(val==='update'){
      this.getAllBasicSalary();
    }
  })
  }

  deleteBasicSalary(id:string){
    this.api.deleteBasicSalary(id)
    .subscribe({
      next:(res)=>{
        alert("Basic Salary deleted successfully.")
        this.getAllBasicSalary()
      },
      error:()=>{
        alert("Error while deleting Basic Salary !!")
      }
    })
  }

  closeElement(){
    this.router.navigateByUrl('')
  }


}
