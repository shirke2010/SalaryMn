import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { OtherHeadsCreateComponent } from '../other-heads-create/other-heads-create.component';
import { ApiService } from '../../services/api.service';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { __values } from 'tslib';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-other-heads',
  templateUrl: './other-heads.component.html',
  styleUrls: ['./other-heads.component.scss']
})

export class OtherHeadsComponent implements OnInit {

  title = 'otherHeads';
  displayedColumns: string[] = ['head','payOrRec','fixAmtOrPercentage','value','applicableFromDate','applicableTillDate','nextVAlue','action'];
  dataSource!: MatTableDataSource<any>;
    
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog : MatDialog, private api : ApiService, private router : Router){}

  ngOnInit():void{
    this.getAllOtherHeads();
  }
  
  getAllOtherHeads(){
    this.api.getOtherHeads()
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

  editOtherHeads(row:any){
      this.dialog.open(OtherHeadsCreateComponent,{
        width:'30%',
        data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllOtherHeads();
      }
    })
  }
  
  deleteOtherHeads(id:string){
    this.api.deleteOtherHeads(id)
    .subscribe({
      next:(res)=>{
        alert("Other heads deleted successfully.")
        this.getAllOtherHeads()
      },
      error:()=>{ 
        alert("Error while deleting Other heads !!")
      }
    })
  }

  openOtherHeadsCreate(){
      this.dialog.open(OtherHeadsCreateComponent, {
        width:'30%'
    }).afterClosed().subscribe(val=>{
        if(val==='save'){
          this.getAllOtherHeads();
        }
    })
  }
  
  closeElement(){
    this.router.navigateByUrl('')
  }

}
