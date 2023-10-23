import { Component,Inject, OnInit} from '@angular/core';
import{FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})

export class EmployeeComponent implements OnInit {
  employeeForm !: FormGroup;
  actionBtn : string = "save";
  employeeData:any=[];
  cities:any=[];
  states:any=[];
  header : string = "Add Employee";

    constructor(private formBuilder : FormBuilder,
    private api : ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialogRef:MatDialogRef<EmployeeComponent>){}

    ngOnInit():void{
     this.employeeForm = this.formBuilder.group({
      _id:[null],
      name:['',Validators.required],
      email:[''],
      dateOfJoining:['',Validators.required],
      designation:['',Validators.required],
      DOB:['',Validators.required],
      address:['',Validators.required],
      city:['',Validators.required],
      state:['',Validators.required],
      pinCode:[''],
      contactNumber:['',Validators.required],
      employeeCode:['',Validators.required],
    })

    if(this.editData){
      this.actionBtn = "Update";
      this.employeeForm.controls['_id'].setValue(this.editData._id);
      this.employeeForm.controls['name'].setValue(this.editData.name);
      this.employeeForm.controls['email'].setValue(this.editData.email);
      this.employeeForm.controls['dateOfJoining'].setValue(this.editData.dateOfJoining);
      this.employeeForm.controls['designation'].setValue(this.editData.designation);
      this.employeeForm.controls['DOB'].setValue(this.editData.DOB);
      this.employeeForm.controls['address'].setValue(this.editData.address);
      this.employeeForm.controls['city'].setValue(this.editData.city);
      this.employeeForm.controls['state'].setValue(this.editData.state);
      this.employeeForm.controls['pinCode'].setValue(this.editData.pinCode);
      this.employeeForm.controls['contactNumber'].setValue(this.editData.contactNumber);
      this.employeeForm.controls['employeeCode'].setValue(this.editData.employeeCode);
      this.header = "Update Employee";
    }

    this.api.getEmployee().subscribe((allData)=>{
      this.employeeData = allData;
      this.cities =  this.removeDuplicates(this.employeeData.map((x : any) => x.city));
      this.states = this.removeDuplicates(this.employeeData.map((x : any) => x.state));
    })

  }

  addEmployee(){
    if(!this.editData){
      if(this.employeeForm.valid){
        this.api.postEmployee(this.employeeForm.value)
          .subscribe({
            next:(res)=>{
              alert("Employee added successfully")
              this.employeeForm.reset();
              this.dialogRef.close('save');
            }, 
            error:()=>{
              alert("Error while adding employee !!")
            }
          }
        )
      }
    }else{
      this.updateEmployee()
    }
  }

  updateEmployee(){
    this.api.putEmployee(this.employeeForm.value,this.editData._id)
    .subscribe({
      next:(res)=>{
        alert("Employee updated successfully");
        this.employeeForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error while updating the employee !!")
      }
    })
  }
  
  removeDuplicates(city:any){
  let unique_array = []
  for(let i = 0;i < city.length; i++){
      if(unique_array.indexOf(city[i]) == -1){
          unique_array.push(city[i])
      }
  }
  return unique_array
  } 

} 
