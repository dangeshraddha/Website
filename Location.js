import mongoose from 'mongoose';
const schema=new mongoose.Schema({
  userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},emergencyId:String,
  latitude:Number,longitude:Number,accuracy:Number,timestamp:{type:Date,default:Date.now},
  source:{type:String,default:'browser-geolocation'}
});
export default mongoose.model('Location',schema);
