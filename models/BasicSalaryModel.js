const mongoose = require('mongoose')
const basicSalarySchema = mongoose.Schema(
    {
        employeeId:{
            // type:String,
            type:mongoose.Schema.Types.ObjectId,
            required:true
        },
        
        basicAmount:{
            type:Number,
            required:true
        },

        approvedBy:{
            type:String,
            required:true
        },

        date:{
            type:Date,
            required:true
        },

        applicableFromDate:{
            type:Date,
            required:true
        },

        applicableTillDate:{
            type:Date,
            required:true
        },

        nextBasicAmount:{
            type:Number,
            // required:true
        },

        CVNo:{
            type:String,
            required:false
        }
    },
    {
        timeStamp:true
    }
);

const BasicSalary = mongoose.model('BasicSalary',basicSalarySchema);
module.exports = BasicSalary;
    