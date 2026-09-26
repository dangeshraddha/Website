import {Router} from 'express';
import auth from '../middleware/auth.js';
import Contact from '../models/Contact.js';
const r=Router(); r.use(auth);
r.get('/',async(req,res)=>res.json(await Contact.find({userId:req.user.id}).sort({priority:1,name:1})));
r.post('/',async(req,res)=>{try{const c=await Contact.create({...req.body,userId:req.user.id});res.status(201).json(c);}catch(e){res.status(400).json({message:'Invalid contact'});}});
r.put('/:id',async(req,res)=>{const c=await Contact.findOneAndUpdate({_id:req.params.id,userId:req.user.id},req.body,{new:true});if(!c)return res.status(404).json({message:'Contact not found'});res.json(c);});
r.delete('/:id',async(req,res)=>{await Contact.deleteOne({_id:req.params.id,userId:req.user.id});res.json({ok:true});});
export default r;
