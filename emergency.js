import {Router} from 'express';
import auth from '../middleware/auth.js';
import Emergency from '../models/Emergency.js';
const r=Router();
r.post('/',auth,async(req,res)=>{
  try{
    const x=req.body;
    const e=await Emergency.findOneAndUpdate(
      {emergencyId:x.id||x.emergencyId},
      {emergencyId:x.id||x.emergencyId,userId:req.user.id,startTime:x.start||x.startTime,trigger:x.trigger,
       riskScore:x.riskScore,riskLevel:x.riskLevel,location:x.location,evidence:x.evidence||[],
       status:x.status||'ACTIVE',networkStatus:x.network||'ONLINE',timeline:x.timeline||[]},
      {upsert:true,new:true,setDefaultsOnInsert:true}
    );
    res.status(201).json({message:'Emergency stored',emergencyId:e.emergencyId});
  }catch(e){res.status(500).json({message:'Emergency storage failed'});}
});
r.get('/',auth,async(req,res)=>{
  const rows=await Emergency.find({userId:req.user.id}).sort({createdAt:-1}).limit(50);
  res.json(rows);
});
export default r;
