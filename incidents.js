import {Router} from 'express';
import auth from '../middleware/auth.js';
import Incident from '../models/Incident.js';
const r=Router();r.use(auth);
r.post('/',async(req,res)=>res.status(201).json(await Incident.create({...req.body,userId:req.user.id})));
r.get('/',async(req,res)=>res.json(await Incident.find({userId:req.user.id}).sort({createdAt:-1}).limit(100)));
r.patch('/:id/resolve',async(req,res)=>res.json(await Incident.findOneAndUpdate({_id:req.params.id,userId:req.user.id},{status:'RESOLVED',resolvedAt:new Date()},{new:true})));
export default r;
