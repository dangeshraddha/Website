import mongoose from 'mongoose';
const schema=new mongoose.Schema({
  userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},emergencyId:String,
  type:String,fileName:String,mimeType:String,size:Number,sha256:String,
  storageStatus:{type:String,default:'LOCAL'},storageUrl:String,
  capturedAt:{type:Date,default:Date.now},metadata:Object
});
export default mongoose.model('Evidence',schema);
