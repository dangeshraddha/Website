import {Router} from 'express';
import auth from '../middleware/auth.js';
import Location from '../models/Location.js';
const r=Router();r.use(auth);
r.post('/',async(req,res)=>{const x=await Location.create({...req.body,userId:req.user.id});res.status(201).json(x);});
r.get('/latest',async(req,res)=>{const x=await Location.findOne({userId:req.user.id}).sort({timestamp:-1});res.json(x||null);});
export default r;
