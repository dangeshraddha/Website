import mongoose from 'mongoose';
const schema=new mongoose.Schema({
  name:{type:String,required:true},email:{type:String,required:true,unique:true},
  phone:String,passwordHash:{type:String,required:true},preferredLanguage:{type:String,default:'English'},
  contacts:[{name:String,phone:String,relationship:String,priority:String,verified:Boolean}]
},{timestamps:true});
export default mongoose.model('User',schema);
