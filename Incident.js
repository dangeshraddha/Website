import mongoose from 'mongoose';
const schema=new mongoose.Schema({
  userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},emergencyId:String,
  title:String,description:String,riskScore:Number,riskLevel:String,
  status:{type:String,default:'OPEN'},createdAt:{type:Date,default:Date.now},resolvedAt:Date
});
export default mongoose.model('Incident',schema);
