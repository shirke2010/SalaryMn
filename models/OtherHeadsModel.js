const mongoose = require('mongoose')
const otherHeadsSchema = mongoose.Schema(
   {
        head:{
            type:String,
            required:true
        },
        payOrRec:{
            type:String,
            required:true
        },
        fixAmtOrPercentage:{
            type:String,
            required:true
        },
        value:{
            type:Number,
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
        nextVAlue:{
            type:Number,
            required:false
        }
   },
   {
    timeStamp:true
   }
);

const OtherHeads = mongoose.model('OtherHeads',otherHeadsSchema);
module.exports = OtherHeads;


