require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
const Transaction = mongoose.model('Transaction', new mongoose.Schema({
  type: {type:String, enum:['income','expense'], required:true},
  amount: {type:Number, required:true, min:0.01},
  category: {type:String, required:true, trim:true},
  note: {type:String, default:'', trim:true},
  date: {type:String, required:true, match:/^\d{4}-\d{2}-\d{2}$/}
}, {timestamps:true}));
function invalid(err){ return err.name==='ValidationError'||err.name==='CastError'; }
app.get('/api/transactions', async(req,res)=>{try{res.json(await Transaction.find().sort({date:-1,createdAt:-1}));}catch(e){res.status(500).json({error:'Database error'});}});
app.post('/api/transactions',async(req,res)=>{try{const {type,amount,category,note,date}=req.body;const doc=await Transaction.create({type,amount,category,note,date});res.status(201).json(doc);}catch(e){res.status(invalid(e)?400:500).json({error:e.message});}});
app.put('/api/transactions/:id',async(req,res)=>{try{const {type,amount,category,note,date}=req.body;const doc=await Transaction.findByIdAndUpdate(req.params.id,{type,amount,category,note,date},{new:true,runValidators:true,overwrite:true});if(!doc)return res.status(404).json({error:'Not found'});res.json(doc);}catch(e){res.status(invalid(e)?400:500).json({error:e.message});}});
app.delete('/api/transactions/:id',async(req,res)=>{try{const doc=await Transaction.findByIdAndDelete(req.params.id);if(!doc)return res.status(404).json({error:'Not found'});res.json({message:'Deleted'});}catch(e){res.status(invalid(e)?400:500).json({error:e.message});}});
const port=process.env.PORT||3000;
mongoose.connect(process.env.MONGODB_URI||'mongodb://127.0.0.1:27017/income_expense_tracker').then(()=>app.listen(port,()=>console.log(`MongoDB connected; app at http://localhost:${port}`))).catch(e=>{console.error('MongoDB connection failed:',e.message);process.exit(1);});
