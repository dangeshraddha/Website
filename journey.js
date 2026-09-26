import {Router} from 'express';
import auth from '../middleware/auth.js';
import Journey from '../models/Journey.js';
const r=Router();r.use(auth);
r.post('/',async(req,res)=>res.status(201).json(await Journey.create({...req.body,userId:req.user.id})));
r.get('/',async(req,res)=>res.json(await Journey.find({userId:req.user.id}).sort({startedAt:-1}).limit(20)));
r.patch('/:id/safe',async(req,res)=>{const x=await Journey.findOneAndUpdate({_id:req.params.id,userId:req.user.id},{status:'COMPLETED',completedAt:new Date()},{new:true});res.json(x);});
r.patch('/:id/activate',async(req,res)=>{const x=await Journey.findOneAndUpdate({_id:req.params.id,userId:req.user.id},{status:'ACTIVE'},{new:true});res.json(x);});
export default r;
