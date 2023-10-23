import { Component,Inject, OnInit } from '@angular/core';
import{FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
 
import { ApiService } from '../../services/api.service'
import { BasicSalaryComponent } from '../basic-salary/basic-salary.component';

@Component({
  selector: 'app-basic-salary-create',
  templateUrl: './basic-salary-create.component.html',
  styleUrls: ['./basic-salary-create.component.scss']
})

export class BasicSalaryCreateComponent implements OnInit{

  basicSalaryCreateForm !: FormGroup;
  actionBtn : string = "save";
  header : string = "Create Basic Salary";

  constructor(private formBuilder : FormBuilder,
    private api : ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialogRef:MatDialogRef<BasicSalaryComponent>){}

    employeeData:any=[];

    ngOnInit():void{

      this.basicSalaryCreateForm = this.formBuilder.group({
      _id:[null],
      employeeId:['',Validators.required],
      basicAmount:['',Validators.required],
      approvedBy:['',Validators.required],
      date:[0,Validators.required],
      applicableFromDate:['',Validators.required],
      applicableTillDate:['',Validators.required],
      nextBasicAmount:[0],
      CVNo:['',Validators.required]
    })

    if(this.editData){
      this.actionBtn = "Update";
      this.basicSalaryCreateForm.controls['_id'].setValue(this.editData._id);
      this.basicSalaryCreateForm.controls['employeeId'].setValue(this.editData.employeeId);
      this.basicSalaryCreateForm.controls['basicAmount'].setValue(this.editData.basicAmount);
      this.basicSalaryCreateForm.controls['approvedBy'].setValue(this.editData.approvedBy);
      this.basicSalaryCreateForm.controls['date'].setValue(this.editData.date);
      this.basicSalaryCreateForm.controls['applicableFromDate'].setValue(this.editData.applicableFromDate);
      this.basicSalaryCreateForm.controls['applicableTillDate'].setValue(this.editData.applicableTillDate);
      this.basicSalaryCreateForm.controls['nextBasicAmount'].setValue(this.editData.nextBasicAmount);
      this.basicSalaryCreateForm.controls['CVNo'].setValue(this.editData.CVNo);
      this.header = "Update Basic Salary";
    }
    
    this.api.getEmployee().subscribe((allData)=>{
      this.employeeData = allData;
    })
  
  }

  addBasicSalary(){
    if(!this.editData){
      if(this.basicSalaryCreateForm.valid){
        this.api.postBasicSalary(this.basicSalaryCreateForm.value)
          .subscribe({
            next:(res)=>{
              alert("Basic salary added successfully")
              this.basicSalaryCreateForm.reset();
              this.dialogRef.close('save');
            },
            error:()=>{
              alert("Error while adding Basic salary !!")
            }
          }
        )
      }
    }else{
      this.updateOtherHeads()
    }
  }

  updateOtherHeads(){
    this.api.putBasicSalary(this.basicSalaryCreateForm.value,this.editData._id)
    .subscribe({
      next:(res)=>{
        alert("Basic salary updated successfully");
        this.basicSalaryCreateForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error while updating the Basic salary !!")
      }
    })
  }

}
