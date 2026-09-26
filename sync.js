import {Router} from 'express';
import auth from '../middleware/auth.js';
import SyncItem from '../models/SyncItem.js';
const r=Router();r.use(auth);
r.post('/batch',async(req,res)=>{
 const items=Array.isArray(req.body.items)?req.body.items:[];
 const out=[];
 for(const item of items){
  const x=await SyncItem.findOneAndUpdate({clientId:item.id},{clientId:item.id,userId:req.user.id,type:item.type,payload:item.payload,status:'SYNCED',syncedAt:new Date()},{upsert:true,new:true});
  out.push({clientId:x.clientId,status:x.status});
 }
 res.json({results:out});
});
r.get('/pending',async(req,res)=>res.json(await SyncItem.find({userId:req.user.id,status:'PENDING'})));
export default r;
