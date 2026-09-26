import mongoose from 'mongoose';
const schema=new mongoose.Schema({
  emergencyId:{type:String,unique:true},userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
  startTime:Date,trigger:String,riskScore:Number,riskLevel:String,location:Object,
  evidence:[Object],status:{type:String,default:'ACTIVE'},networkStatus:String,timeline:[Object]
},{timestamps:true});
export default mongoose.model('Emergency',schema);
