import User from '../models/User.js';

export async function getUsers(req, res) {
    try{
        const getUsers= await User.find();
        res.status(200).json(getUsers);
    }catch(err){
        res.status(500).json({message:'Internal Server Error'});
    }
};

export async function registerUser(req, res) {
try{
    const {userName,password}=req.body;
    if(!userName || !password){
        return res.status(400).json({message:'Username and password are required'});
    }
    const existingUser=await User.findOne({userName});
    if(existingUser){
        return res.status(400).json({message:'Username already exists'});
    }
    const newUser=new User({userName,password});
    await newUser.save();
    res.status(201).json({message:'User registered successfully'});
}catch(err){
    res.status(500).json({message:'Internal Server Error'});
}
};