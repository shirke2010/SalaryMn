const mongoose = require('mongoose')
const salaryTransBreakUpSchema = mongoose.Schema(
   {
        stId:{
            type:String,
            required:false
        },
        headId:{
            type:String,
            required:false
        },
        value:{
            type:String,
            required:false
        },
        amount:{
            type:Number,
            required:false
        },
        transType:{
            type:String,
            required:false
        }
    },
   {
    timeStamp:true
   }
);

const SalaryTransBreakUp = mongoose.model('SalaryTransBreakUp',salaryTransBreakUpSchema);
module.exports = SalaryTransBreakUp;