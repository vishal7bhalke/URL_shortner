import mongoose from 'mongoose';
const urlschema= new mongoose.Schema({
shortid:{type:String,required:true,unique:true},
longurl:{type:String,required:true},
shorturl:{type:String,required:true,unique:true},
createdat:{type:Date,default:Date.now}
})
const url=mongoose.model('url',urlschema);
export default url;
