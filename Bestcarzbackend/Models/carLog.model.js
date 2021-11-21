const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const carlogSchema = new Schema(
{
username:{type:String,required:true},
carname:{type:String,required:true},
issue:{type:String,required:true},
privacy:{type:Boolean,required:true},
mechanicused:{type:String},
},{
    timestamps:true,
}
);
const CarLog = mongoose.model('CarLog',carlogSchema);
module.exports = CarLog;