import { Component,Inject } from '@angular/core';
import{FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
 
import { ApiService } from '../../services/api.service'
import { OtherHeadsComponent } from '../other-heads/other-heads.component';

@Component({
  selector: 'app-other-heads-create',
  templateUrl: './other-heads-create.component.html',
  styleUrls: ['./other-heads-create.component.scss']
})
export class OtherHeadsCreateComponent {
  otherHeadsCreateForm !: FormGroup;
  actionBtn : string = "save";
  header : string = "Create Other Heads";

    constructor(private formBuilder : FormBuilder,
    private api : ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialogRef:MatDialogRef<OtherHeadsComponent>){}

    ngOnInit():void{

          this.otherHeadsCreateForm = this.formBuilder.group({
          _id:[null],
          head:['',Validators.required],
          payOrRec:['',Validators.required],
          fixAmtOrPercentage:['',Validators.required],
          value:[0,Validators.required],
          applicableFromDate:['',Validators.required],
          applicableTillDate:['',Validators.required],
          nextVAlue:[0,Validators.required]
        })

        if(this.editData){
          this.actionBtn = "Update";
          this.otherHeadsCreateForm.controls['_id'].setValue(this.editData._id);
          this.otherHeadsCreateForm.controls['head'].setValue(this.editData.head);
          this.otherHeadsCreateForm.controls['payOrRec'].setValue(this.editData.payOrRec);
          this.otherHeadsCreateForm.controls['fixAmtOrPercentage'].setValue(this.editData.fixAmtOrPercentage);
          this.otherHeadsCreateForm.controls['value'].setValue(this.editData.value);
          this.otherHeadsCreateForm.controls['applicableFromDate'].setValue(this.editData.applicableFromDate);
          this.otherHeadsCreateForm.controls['applicableTillDate'].setValue(this.editData.applicableTillDate);
          this.otherHeadsCreateForm.controls['nextVAlue'].setValue(this.editData.nextVAlue);
          this.header = "Update Other Heads";
        }
    }

    addOtherHeads(){
      if(!this.editData){
        if(this.otherHeadsCreateForm.valid){
          this.api.postOtherHeads(this.otherHeadsCreateForm.value)
            .subscribe({
              next:(res)=>{
                alert("Other Heads added successfully")
                this.otherHeadsCreateForm.reset();
                this.dialogRef.close('save');
              },
              error:()=>{
                alert("Error while adding Other Heads !!")
              }
            }
          )
        }
      }else{
        this.updateOtherHeads()
      }
    }
  
    updateOtherHeads(){
      this.api.putOtherHeads(this.otherHeadsCreateForm.value,this.editData._id)
      .subscribe({
        next:(res)=>{
          alert("Other Heads updated successfully");
          this.otherHeadsCreateForm.reset();
          this.dialogRef.close('update');
        },
        error:()=>{
          alert("Error while updating the Other Heads !!")
        }
      })
    }

}
