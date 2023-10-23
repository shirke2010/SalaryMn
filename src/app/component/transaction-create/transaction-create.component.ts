import { Component, Inject, OnInit, ViewChild } from '@angular/core';
// import { FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { TransactionComponent } from '../transaction/transaction.component';
import { MatTableDataSource } from '@angular/material/table';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Decimal128 } from 'mongoose';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.scss'],
})

export class TransactionCreateComponent {
  // transactionCreate!: FormGroup;
  actionBtn: string = 'save';
  employeeData: any = [];
  selectedEmpId: string = '';
  header: string = 'Add Transaction';
  totalEarning: string = '0';
  totalDeduction: string = '0';
  ttlDaysInMonth: number = 0;
  basicSalaryData: any = [];
  otherHeads: any = [];
  otherHeadsData: any[] = [];
  otherHeadsData1: any[] = [];
  otherHeadsSavedData: any[]=[];
  id: string = '';
  formData: any = {};
  createdDate: string = '';
  totalDaysInMonth : number = 0;

  constructor(
    // private formBuilder: FormBuilder,
    private api: ApiService,
    public route: ActivatedRoute,
    private router: Router,
    // @Inject(MAT_DIALOG_DATA) public editData: any,
    // private dialogRef: MatDialogRef<TransactionComponent>,
    private http: HttpClient
  ) {}

  onSubmit(formData: any) {

    const obj = {
      employeeId: this.formData.employeeId,
      date: this.formData.date,
      forMonth: this.formData.forMonth,
      forYear: this.formData.forYear,
      amount: this.formData.amount,
      modeOfPayment: this.formData.modeOfPayment,
      transactionRef: this.formData.transactionRef,
      presentDays: this.formData.presentDays,
      basicSalary: this.formData.basicSalary,
      calculatedBasicAmount: this.formData.calculatedBasicAmount,
      earning: [] as any,
      deduction: [] as any,
      };
      
      this.otherHeadsData.forEach((element) => {
        obj.earning.push({stId : 0, headId : element._id, value : element.value, amount : element.actualAmt, transType : "E"})
      });

      this.otherHeadsData1.forEach((element) => {
        obj.deduction.push({stId : 0, headId : element._id, value : element.value, amount : element.actualAmt, transType : "D"})
      });

      this.api.postSalaryTransaction(obj).subscribe({
        // this.api.postSalaryTransaction(this.formData).subscribe({
        next: (res) => {
          // this.dialogRef.close('save');
          alert('Salary transaction added successfully');
          this.closeElement();
        },
        error: () => {
          alert('Error while adding Salary transaction !!');
        },
      });

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      (this.formData.forMonth = param['month']), (this.formData.forYear = param['year']);
      this.id = param['id'];
    });


    if(this.formData.forMonth.length > 0 && this.formData.forYear.length > 0){
      this.totalDaysInMonth =  this.getNumberOfDaysInMonth(this.formData.forYear, this.formData.forMonth)
    }

    if (this.id && this.id.length > 0) {
      this.api.getSalaryTransactionById(this.id).subscribe((allData) => {
      this.formData = allData;
      });
    }

    this.getOtherHeads();

    if (this.id && this.id.length > 0) {
         this.api.getSalaryTransBreakUp().subscribe({next:(res)=>{

             this.otherHeadsSavedData = res.filter((x:any)=> x.stId == this.id);
              
             this.otherHeadsSavedData.forEach(e=>{

                  this.otherHeadsData.forEach((E)=>{
                    if(E._id == e.headId && e.transType == 'E'){
                      E.value = e.value,
                      E.actualAmt = e.amount
                    }
                  })
                  this.otherHeadsData1.forEach((E)=>{
                    if(E._id == e.headId && e.transType == 'D'){
                      E.value = e.value,
                      E.actualAmt = e.amount
                    }
                  })

              })
           
          },
          error: (error) => {
            alert('error while fetching the record !!');
          },
      })
    }

    this.api.getEmployee().subscribe((allData) => {
    this.employeeData = allData;
    });

    // const yearControl = this.transactionCreate.get('forYear');
    // yearControl?.valueChanges.subscribe(x=>{
    //   this.filterYear = x;
    // })

  }

  title = 'otherHeads';
  displayedColumns: string[] = ['head','fixAmtOrPercentage','value','actualAmt'];
  dataSource!: MatTableDataSource<any>;
  dataSource1!: MatTableDataSource<any>;

  getOtherHeads() {

      // this.api.getOtherHeads().subscribe({next:(res)=>{
      //     this.dataSource = new MatTableDataSource(res);
      //    },
      // })

      this.api.getOtherHeads().subscribe({next: (res) => {
      this.otherHeadsData = res.filter((x:any)=>x.payOrRec == 'Payment');
      this.dataSource = new MatTableDataSource(this.otherHeadsData);
      },
      error: (error) => {
        alert('error while fetching the record !!');
      },
    });

    this.api.getOtherHeads().subscribe({
      next: (res) => {
        this.otherHeadsData1 = res.filter((x: any) => x.payOrRec != 'Payment');
        this.dataSource1 = new MatTableDataSource(this.otherHeadsData1);
      },
      error: (error) => {
        alert('error while fetching the record !!');
      },
    });
  }

  actualSalaryChange() {
    this.otherHeadsData.forEach((element) => {
      element.actualAmt =
        element.fixAmtOrPercentage == 'Fix'
          ? (element.value / this.totalDaysInMonth) * this.formData.presentDays
          : Math.round(
              (Number(this.formData.calculatedBasicAmount) / 100) * element.value
            );
    });
    this.dataSource = new MatTableDataSource(this.otherHeadsData);

    this.otherHeadsData1.forEach((element) => {
      element.actualAmt =
        element.fixAmtOrPercentage == 'Fix'
          ? (element.value / this.totalDaysInMonth) * this.formData.presentDays
          : Math.round(
              (Number(this.formData.calculatedBasicAmount) / 100) * element.value
            );
    });
    this.dataSource1 = new MatTableDataSource(this.otherHeadsData1);
  }

  changeClient(value: any) {
    this.api.getBasicSalary().subscribe((allData) => {
      this.basicSalaryData = allData;

      this.formData.basicSalary = 0;

      const BasicSalary: any[] = this.basicSalaryData.filter(
        (x: any) => x.employeeId == value
      );

      if (BasicSalary && BasicSalary.length > 0) {
        this.formData.basicSalary = BasicSalary[0].basicAmount;
      }
      return 0;
    });
  }

  calculateBasicAmt(event: any) {
    this.formData.calculatedBasicAmount = '0';
    this.formData.presentDays = event.target.value;
    
    if (!this.formData.presentDays ||(this.formData.presentDays && this.formData.presentDays > 0 && this.formData.basicSalary)) {
      this.formData.calculatedBasicAmount = String(
        // Math.round(((this.basicSalary) / this.totalDaysInMonth) * Number(AS))
        Math.round((this.formData.basicSalary / this.totalDaysInMonth) * this.formData.presentDays)
      );
      this.actualSalaryChange();

      this.totalEarning = !this.otherHeadsData
        .map((t) => t.actualAmt)
        .reduce((acc, value) => acc + value, 0)
        ? '0'
        : this.otherHeadsData
            .map((t) => t.actualAmt)
            .reduce((acc, value) => acc + value, 0);

      this.totalDeduction = !this.otherHeadsData1
        .map((t) => t.actualAmt)
        .reduce((acc, value) => acc + value, 0)
        ? '0'
        : this.otherHeadsData1
            .map((t) => t.actualAmt)
            .reduce((acc, value) => acc + value, 0);

            this.formData.amount = Number(this.formData.calculatedBasicAmount) + Number(this.totalEarning) -  Number(this.totalDeduction);
            
            // -- below code is also running for 'deduction' value (Testing with 'for' loop)
            // for (var i = this.otherHeadsData1.length - 1; i >= 0; i--) {
            //   this.testNumber += parseInt(this.otherHeadsData1[i]['actualAmt']);
            // }
            // console.log(this.testNumber)
    }
    return '';
  }

  calculateTotalEarning() {
    // return this.otherHeadsData.reduce((accum, curr) => accum + curr.actualAmt, 0);
    return !this.otherHeadsData
      .map((t) => t.actualAmt)
      .reduce((acc, value) => acc + value, 0)
      ? '0'
      : this.otherHeadsData
          .map((t) => t.actualAmt)
          .reduce((acc, value) => acc + value, 0) + Number(this.formData.calculatedBasicAmount);
  }

  calculateTotalDeduction() {
    //return this.otherHeadsData1.reduce((accum, curr) => accum + curr.actualAmt, 0);
    return !this.otherHeadsData1
      .map((t) => t.actualAmt)
      .reduce((acc, value) => acc + value, 0)
      ? '0'
      : this.otherHeadsData1
          .map((t) => t.actualAmt)
          .reduce((acc, value) => acc + value, 0);
  }

  getNumberOfDaysInMonth(yearStr: string, monthStr: string) {
    // Parse the year and month strings into numbers
    const year = parseInt(yearStr, 10);
    const month = this.getMonthNumberFromName(monthStr, yearStr); // parseInt(monthStr, 10);

    // Check if the parsing was successful
    if (isNaN(year) || isNaN(month)) {
      throw new Error('Invalid year or month values');
    }

    // Create a Date object with the parsed year and month
    const date = new Date(year, month - 1, 1);

    // Move to the next month and subtract one day to get the last day of the given month
    date.setMonth(date.getMonth() + 1);
    date.setDate(date.getDate() - 1);

    // Get the day of the month, which gives the number of days in the month
    return date.getDate();
    // console.log(date.getDate());
        
  }

  getMonthNumberFromName(monthName : string, yearName : string) {
    return new Date(`${monthName} 1, ${yearName}`).getMonth() + 1; // It's indexing starts from '0', that's why '+1' is added.
  }

  closeElement() {
    //this.router.navigateByUrl('TR');
    this.router.navigate(['TR'], { queryParams: { month: this.formData.forMonth , year: this.formData.forYear } });
  }

  saveTransaction() {
    // this.onSubmit(this.formData)
  }
}
