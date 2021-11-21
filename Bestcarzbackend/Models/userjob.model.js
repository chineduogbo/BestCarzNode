const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userjobSchema = new Schema(
{
username:{type:String,required:true},
specialty:{type:String},
businessname:{type:String,required:true},
location:{type:String,required:true},
lat:{type:String},
lng:{type:String},
},{
    timestamps:true,
}
);
const UserJob = mongoose.model('UserJob',userjobSchema);
module.exports = UserJob;