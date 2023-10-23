const mongoose = require('mongoose')
const salaryTransactionSchema = mongoose.Schema(
    {
        employeeId:{
            type:String,
            required:true
        },
        date:{
            type:Date,
            required:true
        },
        forMonth:{
            type:String,
            required:true
        },
        forYear:{
            type:String,
            required:true
        },
        amount:{
            type:Number,
            required:true
        },
        modeOfPayment:{
            type:String,
            required:true
        },
        transactionRef:{
            type:String,
            required:true
        },
        presentDays:{
            type:String,
            required:true
        },
        basicSalary:{
            type:Number,
            required:true
        },
        calculatedBasicAmount:{
            type:Number,
            required:true
        }
    },
        {
            timeStamp:true
        }
);

const SalaryTransaction = mongoose.model('SalaryTransaction',salaryTransactionSchema);
module.exports = SalaryTransaction
