import mongoose from 'mongoose';
const schema=new mongoose.Schema({
  clientId:{type:String,unique:true},userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
  type:String,payload:Object,status:{type:String,default:'PENDING'},createdAt:{type:Date,default:Date.now},
  syncedAt:Date,error:String
});
export default mongoose.model('SyncItem',schema);
