import mongoose from 'mongoose';
const schema=new mongoose.Schema({
  userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},destination:String,
  expectedArrival:Date,status:{type:String,default:'ACTIVE'},startedAt:{type:Date,default:Date.now},
  completedAt:Date,lastCheckinAt:Date
});
export default mongoose.model('Journey',schema);
