import {Router} from 'express';
import crypto from 'crypto';
import auth from '../middleware/auth.js';
import Evidence from '../models/Evidence.js';
const r=Router();r.use(auth);
r.post('/metadata',async(req,res)=>{const x=await Evidence.create({...req.body,userId:req.user.id});res.status(201).json(x);});
r.post('/hash',async(req,res)=>{const data=String(req.body.data||'');res.json({sha256:crypto.createHash('sha256').update(data).digest('hex')});});
r.get('/',async(req,res)=>res.json(await Evidence.find({userId:req.user.id}).sort({capturedAt:-1}).limit(100)));
export default r;
