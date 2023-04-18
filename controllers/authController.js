import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import Book from '../models/bookModel.js';

export const getAll=async(req,res,next)=>{
    try {
        const get=await User.find().select("-password").$where("this.isAdmin==false")
        res.status(200).json(get)
    } catch (error) {
        next(error)
    }
}

export const getByToken=async(req,res,next)=>{
    try {
        const get=await User.findById({_id:req.user.id})
        res.status(200).json(get)
    } catch (error) {
        next(error)
    }
}

export const register = async (req, res, next) => {
    try {
        // let user=await User.findOne({ema})
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const find=await User.findOne({email:req.body.email})
        const dep=await User.findOne({department:req.body.department})
        if(find){
            res.status(401).json({message:"Email already exists"});
        }else if(dep){
            res.status(401).json({message:"Department already exists"});
        }else{
            const newUser = new User({
                name:req.body.name,
                department:req.body.department,
                email:req.body.email,
                password:hash
            });
    
            await newUser.save();
            res.status(201).json({message:"User has been created."});
        }
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const user=await User.findOne({email:req.body.email})
        if (user) {
            const isPasswordCorrect=await bcrypt.compare(req.body.password,user.password)
            if (!isPasswordCorrect) return res.status(400).json({message:"password wrong"});
            

            const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT)
            //its used for not show admin and password
            //...otherDetails is  mongoose function first two value ignore and balance value in otherDetails
            const {password , isAdmin , ...otherDetails} = user._doc
            //user._doc is used  for one purpose commend and run it
            res.header("token",token)
            .status(200).json({isAdmin,token});
        } else {
           return  res.status(404).json({message:"User not found"}); 
        }
    } catch (err) {
        next(err);
    }
};

export const deleteUser= async (req,res,next)=>{
    try {
        const exUser=await User.findById({_id:req.params.id})
        if(!exUser) return res.status(404).json({message:"User not found"});
        await  User.findByIdAndDelete({_id:req.params.id})
        await Book.findOneAndDelete({userId:req.params.id})
        res.status(200).json({message:"User has been deleted."});
    } catch (error) {
        next(error);
    }
}

export const getUser= async(req,res,next)=>{
    try {
        const user=await User.findOne({email:req.body.email})
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

export const changePassword=async(req,res,next)=>{
    let saltRounds=10;
    bcrypt.hash(req.body.newpassword,saltRounds,async(err,hash)=>{
        let update=await User.findOneAndUpdate({_id:req.params.id},{password:hash},{new:true})
        if(update){
            try {
                res.status(200).json({message:"password changed"})
            } catch (error) {
                res.status(500).json({message:error.message})
            }
        }else{
            res.send("student not found")
        }
    })
}

export const updateUser=async(req,res)=>{
    try {
        const userExist=await User.findById({_id:req.params.id})
        if(!userExist){
            res.status(404).json({message:"User not found"})
        }
        await User.findByIdAndUpdate({_id:req.params.id},{$set:req.body},{new:true})
        res.status(200).json({message:"User has been updated."});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getProfile=async(req,res)=>{
    try {
        const exUser=await User.findById({_id:req.params.id}).select("-password")
        if(!exUser){
            res.status(404).json({message:"User not found"})
        }
        res.status(200).json({data:exUser})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}