const mongoose = require('mongoose')
const employeeScheema = mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Please enter employee name"]
        },
        email:{
            type:String,
            required:false
        },
        dateOfJoining:{
            type:Date,
            required:true
        },
        designation:{
            type:String,
            required:false
        },
        DOB:{
            type:Date,
            required:true
        },
        address:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        pinCode:{
            type:String,
            required:false
        },
        contactNumber:{
            type:String,
            required:true
        },
        employeeCode:{
            type:String,
            required:true
        }
    },

    {
        timestamps:true
    }
    
)

const Employee = mongoose.model('Employee',employeeScheema);
module.exports = Employee;