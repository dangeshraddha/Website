import mongoose from 'mongoose';
const schema=new mongoose.Schema({
  userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},journeyId:String,
  durationMinutes:Number,expiresAt:Date,status:{type:String,default:'ACTIVE'},
  confirmedAt:Date,createdAt:{type:Date,default:Date.now}
});
export default mongoose.model('Checkin',schema);
