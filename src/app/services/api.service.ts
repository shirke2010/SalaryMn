import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
 
  constructor(private http : HttpClient) { }
 

  //// POST Method
  postEmployee(data : any){
    return this.http.post<any>("http://localhost:5000/employee",data)
  }

  postBasicSalary(data : any){
    return this.http.post<any>("http://localhost:5000/basicSalary",data)
  }

  postOtherHeads(data : any){
    return this.http.post<any>("http://localhost:5000/otherHeads",data)
  }

  postSalaryTransaction(data : any){
    return this.http.post<any>("http://localhost:5000/salaryTransaction",data)
  }

  postSalaryTransBreakUp(data : any){
    return this.http.post<any>("http://localhost:5000/salaryTransaction",data)
  }

  //// GET Method
  getEmployee(){
    return this.http.get<any>("http://localhost:5000/employee")
  }

  getOtherHeads(){
    return this.http.get<any>("http://localhost:5000/otherHeads")
  }

  getBasicSalary(){
    return this.http.get<any>("http://localhost:5000/basicSalary")
  }

  getSalaryTransaction(){
    return this.http.get<any>("http://localhost:5000/salaryTransaction")
  }

  getSalaryTransBreakUp(){
    return this.http.get<any>("http://localhost:5000/salaryTransBreakUp")
  }

  //// GET Method by id
  getEmployeeById(id : string){
    return this.http.get<any>("http://localhost:5000/employee/"+id)
  }

  getSalaryTransactionById(id : string){
    return this.http.get<any>("http://localhost:5000/salaryTransaction/"+id)
  }

  getSalaryTransBreakUpById(id : string){
    return this.http.get<any>("http://localhost:5000/salaryTransBreakUp/"+id)
  }


  //// PUT Method

  putEmployee(data:any,id : string){
    return this.http.put<any>("http://localhost:5000/employee/"+id,data)
  }

  putOtherHeads(data:any,id : string){
    return this.http.put<any>("http://localhost:5000/otherHeads/"+id,data)
  }

  putBasicSalary(data:any,id : string){
    return this.http.put<any>("http://localhost:5000/basicSalary/"+id,data)
  }

  //// DELETE Method

  deleteEmployee(id : string){
    return this.http.delete<any>("http://localhost:5000/employee/"+id)
  }

  deleteOtherHeads(id : string){
    return this.http.delete<any>("http://localhost:5000/otherHeads/"+id)
  }
  
  deleteBasicSalary(id : string){
    return this.http.delete<any>("http://localhost:5000/basicSalary/"+id)
  }

  deleteSalaryTransaction(id : string){
    return this.http.delete<any>("http://localhost:5000/salaryTransaction/"+id)
  }

  deleteSalaryTransBreakUp(id : string){
    return this.http.delete<any>("http://localhost:5000/salaryTransBreakUp/"+id)
  }

}

