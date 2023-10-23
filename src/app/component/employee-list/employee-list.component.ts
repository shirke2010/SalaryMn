import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { EmployeeComponent } from '../employee/employee.component';
import { ApiService } from '../../services/api.service';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { __values } from 'tslib';

import {ActivatedRoute,Router} from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})

export class EmployeeListComponent implements OnInit {

  title = 'salary';
  //  displayedColumns: string[] = ['name', 'email', 'dateOfJoining', 'designation', 'DOB','address','contactNumber','action'];
  displayedColumns: string[] = ['employeeCode','name', 'email', 'dateOfJoining', 'designation', 'address', 'city','state','contactNumber','action'];
  dataSource!: MatTableDataSource<any>;
    
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog : MatDialog, private api : ApiService, private router : Router){

  }

  ngOnInit():void{
    this.getAllEmployee();
  }
  
  getAllEmployee(){
  this.api.getEmployee()
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

  openEmployee() {
    this.dialog.open(EmployeeComponent, {
        width:'70%',
    }).afterClosed().subscribe(val=>{
        if(val==='save'){
           this.getAllEmployee();
        }
    })
  }

  editEmployee(row:any){
    this.dialog.open(EmployeeComponent,{
        width:'70%',
        data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllEmployee();
      }
    })
  }

  deleteEmployee(id:string){
    this.api.deleteEmployee(id)
      .subscribe({
        next:(res)=>{
          alert("Employee deleted successfully.")
          this.getAllEmployee()
        },
        error:()=>{
          alert("Error while deleting employee !!")
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

}
