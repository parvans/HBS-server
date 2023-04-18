import Book from '../models/bookModel.js'
import Hall from '../models/hallModel.js'

export const createHall=async(req,res,next)=>{
    try {
        const find=await Hall.findOne({name:req.body.name})
        if(find){
            res.status(401).json({message:"Hall name exists"})
        }else{
            const newHall =await new Hall(req.body)
            let saveHall=await newHall.save()
            res.status(201).json({message:"Hall is created"})
        }
    } catch (error) {
        next(error)
    }
}

export const updateHall=async(req,res,next)=>{
    try {
        let updateHall=await Hall.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json({message:"Hall is updated"})
    } catch (error) {
        next(error)
    }
}
export const getByName=async(req,res,next)=>{
    try {
        let updateHall=await Hall.findOne({name:req.body.name})
        res.status(200).json(updateHall)
    } catch (error) {
        next(error)
    }
}

export const deleteHall=async(req,res,next)=>{
    try {
        await Hall.findByIdAndDelete(req.params.id)
        const book=await Book.find({hallId:req.params.id})
        book.map(async(item)=>{
            await Book.findByIdAndDelete(item._id)
        })
        // await Book.findOneAndDelete({hallId:req.params.id})
        res.status(200).json({message:"Hall is deleted"})
    } catch (error) {
        next(error)
    }
}

export const getById=async(req,res,next)=>{
    try {
        const get=await Hall.findById(req.params.id)
        res.status(200).json(get)
    } catch (error) {
        next(error)
    }
}

export const getAll=async(req,res,next)=>{
    try {
        const get=await Hall.find()
        res.status(200).json(get)
    } catch (error) {
        next(error)
    }
}
