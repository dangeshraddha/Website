import mongoose from 'mongoose';
const schema=new mongoose.Schema({
  userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},emergencyId:String,
  channel:String,recipient:String,message:String,status:String,providerId:String,
  createdAt:{type:Date,default:Date.now}
});
export default mongoose.model('Notification',schema);
