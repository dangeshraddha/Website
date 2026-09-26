import mongoose from 'mongoose';
const schema=new mongoose.Schema({
  userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
  name:{type:String,required:true},phone:{type:String,required:true},
  relationship:String,priority:{type:String,default:'Secondary'},
  verified:{type:Boolean,default:false},createdAt:{type:Date,default:Date.now}
});
export default mongoose.model('Contact',schema);
