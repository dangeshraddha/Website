import {Router} from 'express';
import auth from '../middleware/auth.js';
import Notification from '../models/Notification.js';
import Contact from '../models/Contact.js';
import {sendSMS,sendPush} from '../src/providers.js';
const r=Router();r.use(auth);
r.get('/',async(req,res)=>res.json(await Notification.find({userId:req.user.id}).sort({createdAt:-1}).limit(100)));
r.post('/emergency',async(req,res)=>{
 const {emergencyId,message}=req.body; const contacts=await Contact.find({userId:req.user.id});
 const results=[];
 for(const c of contacts){
   const result=await sendSMS({to:c.phone,message});
   const n=await Notification.create({userId:req.user.id,emergencyId,channel:'SMS',recipient:c.phone,message,status:result.status,providerId:result.providerId});
   results.push({contact:c.name,status:n.status});
 }
 res.json({results});
});
r.post('/push',async(req,res)=>res.json(await sendPush(req.body)));
export default r;
