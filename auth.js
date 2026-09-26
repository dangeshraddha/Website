import {Router} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
const r=Router();
r.post('/register',async(req,res)=>{
  try{
    const {name,email,phone,password}=req.body;
    if(!name||!email||!password)return res.status(400).json({message:'Name, email and password are required'});
    if(await User.findOne({email}))return res.status(409).json({message:'Email already registered'});
    const passwordHash=await bcrypt.hash(password,12);
    const u=await User.create({name,email,phone,passwordHash});
    res.status(201).json({message:'Registered',userId:u._id});
  }catch(e){res.status(500).json({message:'Registration failed'});}
});
r.post('/login',async(req,res)=>{
  try{
    const {email,password}=req.body,u=await User.findOne({email});
    if(!u||!(await bcrypt.compare(password,u.passwordHash)))return res.status(401).json({message:'Incorrect email or password'});
    const token=jwt.sign({id:u._id,email:u.email},process.env.JWT_SECRET,{expiresIn:'7d'});
    res.json({token,user:{id:u._id,name:u.name,email:u.email,phone:u.phone}});
  }catch(e){res.status(500).json({message:'Login failed'});}
});
export default r;
