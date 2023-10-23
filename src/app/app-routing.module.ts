import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicSalaryComponent } from './component/basic-salary/basic-salary.component';
import { EmployeeListComponent } from './component/employee-list/employee-list.component';
import { OtherHeadsComponent } from './component/other-heads/other-heads.component';
import { TransactionComponent } from './component/transaction/transaction.component';
import { ReportsComponent } from './component/reports/reports.component';
import { TransactionCreateComponent } from './component/transaction-create/transaction-create.component';

const routes: Routes = [
  {path:'',component:EmployeeListComponent},
  {path:'BS',component:BasicSalaryComponent},
  {path:'OH',component:OtherHeadsComponent},
  {path:'TR',component:TransactionComponent},
  {path:'RE',component:ReportsComponent},
  {path:'TC',component:TransactionCreateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
