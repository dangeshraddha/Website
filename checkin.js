import {Router} from 'express';
import auth from '../middleware/auth.js';
import Checkin from '../models/Checkin.js';
const r=Router();r.use(auth);
r.post('/',async(req,res)=>{const minutes=Number(req.body.durationMinutes||15);const x=await Checkin.create({userId:req.user.id,journeyId:req.body.journeyId,durationMinutes:minutes,expiresAt:new Date(Date.now()+minutes*60000)});res.status(201).json(x);});
r.patch('/:id/safe',async(req,res)=>res.json(await Checkin.findOneAndUpdate({_id:req.params.id,userId:req.user.id},{status:'SAFE',confirmedAt:new Date()},{new:true})));
r.get('/active',async(req,res)=>res.json(await Checkin.findOne({userId:req.user.id,status:'ACTIVE'}).sort({createdAt:-1})));
export default r;
