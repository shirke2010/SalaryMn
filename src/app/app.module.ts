import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { EmployeeComponent } from './component/employee/employee.component';
import { BasicSalaryComponent } from './component/basic-salary/basic-salary.component';
import { EmployeeListComponent } from './component/employee-list/employee-list.component';
import { OtherHeadsComponent } from './component/other-heads/other-heads.component';
import { TransactionComponent } from './component/transaction/transaction.component';
import { ReportsComponent } from './component/reports/reports.component';
import { MaterialModule } from './material/material.module';
import { OtherHeadsCreateComponent } from './component/other-heads-create/other-heads-create.component';
import { BasicSalaryCreateComponent } from './component/basic-salary-create/basic-salary-create.component';
import { TransactionCreateComponent } from './component/transaction-create/transaction-create.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    BasicSalaryComponent,
    EmployeeListComponent,
    OtherHeadsComponent,
    TransactionComponent,
    ReportsComponent,
    OtherHeadsCreateComponent,
    BasicSalaryCreateComponent,
    TransactionCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    /* we can use 'NgModule' for angular form*/
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
