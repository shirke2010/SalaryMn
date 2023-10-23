import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { TransactionCreateComponent } from '../transaction-create/transaction-create.component';
import { ApiService } from '../../services/api.service';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { __values } from 'tslib';

import { ActivatedRoute, Router } from '@angular/router';
import { ContentObserver } from '@angular/cdk/observers';
import { DataSource } from '@angular/cdk/collections';
import { filter } from 'rxjs';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})

export class TransactionComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private api: ApiService,
    private router: Router,
    public route: ActivatedRoute
  ) {}
  employeeData: any = [];
  filterYear: string = '';
  filterMonth: string = '';

  title = 'transaction';
  displayedColumns: string[] = ['employeeId','date','forMonth','forYear','amount','modeOfPayment','transactionRef','action',];
  dataSource!: MatTableDataSource<any>;

  ngOnInit(): void {

    this.route.queryParams.subscribe((param) => {
      (this.filterMonth = param['month']), (this.filterYear = param['year']);
      if(this.filterMonth && this.filterMonth.length > 0 && this.filterYear && this.filterMonth.length > 0){
        this.getAllTransactions()
      }
    });

    this.api.getEmployee().subscribe((allData) => {
      this.employeeData = allData;
      // this.getAllTransactions();
    });
  }

  getAllTransactions() {
    
      this.api.getSalaryTransaction().subscribe({
      next: (res) => {
      const data = res.filter((x:any)=> 
      ( !this.filterMonth || ( this.filterMonth &&  this.filterMonth.length > 0 && x.forMonth == this.filterMonth) ) 
        &&  ( !this.filterYear || ( this.filterYear &&  this.filterYear.length > 0 && x.forYear == this.filterYear) )  
      );
      this.dataSource = new MatTableDataSource(data);
      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      },
      error: (error) => {
        alert('error while fetching the record !!');
      },
      });

  }

  getEmployee(id: string) {
    const emp: any[] = this.employeeData.filter((x: any) => x._id == id);
    if (emp && emp.length > 0) {
      return emp[0].name;
    }
    return '';
  }

  closeElement(): void {
    this.router.navigateByUrl('');
  }

  openTransactionCreate() {
      this.router.navigate(['TC'], { queryParams: { month: this.filterMonth , year: this.filterYear } })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editTransaction(ID:any){
    this.router.navigate(['TC'], { queryParams: { id: ID, month: this.filterMonth , year: this.filterYear } })
  }

  deleteTransaction(id: string) {
    this.api.deleteSalaryTransaction(id)
    .subscribe({
      next:(res)=>{
        alert("Transaction deleted successfully.")
        this.getAllTransactions()
      },
      error:()=>{ 
        alert("Error while deleting Transaction !!")
      }
    })
  }
  
}
