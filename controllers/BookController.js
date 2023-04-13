import Book from '../models/bookModel.js'
import Hall from '../models/hallModel.js'

export const createBook=async(req,res,next)=>{
    const hallId= req.params.hallId
    const today=new Date().toLocaleDateString()
    const {date,reason,userId}=req.body
    try {
        const hallEx=await Hall.findById({_id:hallId})
        if(!hallEx){
            res.status(401).json({message:"Hall does not exist"})
        }else{
            const isHallBooEex=await Book.find({hallId:hallId}).select("date")
            const books=isHallBooEex.map((book)=>book.date.toLocaleDateString())
            const dt=new Date(date).toLocaleDateString()
            const isBooked=books.includes(dt)
            // console.log(today);
            // console.log(dt);
            if(isBooked){
                res.status(401).json({message:"Hall is booked in this date"})
            }else if(today>dt){
                res.status(401).json({message:"You can not book a hall in the past"})
            }else{
                const newBook= new Book({date:date,reason:reason,hallId:hallId,userId:userId})
                let saveBook=await newBook.save()
                res.status(201).json({message:"Hall is booked"})
            }
        }
    } catch (error) {
        next(error)
    }
}

export const updateBook=async(req,res,next)=>{
    try {
        let updateBook=await Book.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updateBook)
    } catch (error) {
        next(error)
    }
}

export const deleteBook=async(req,res,next)=>{
    const hallId= req.params.hallId
    try {
        await Book.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Booking is deleted"})
    } catch (error) {
        next(error)
    }
}

export const getById=async(req,res,next)=>{
    try {
        const get=await Book.findById(req.params.id)
        res.status(200).json(get)
    } catch (error) {
        next(error)
    }
}


export const getAll=async(req,res,next)=>{
    try {
        const get=await Book.find().populate({path:"hallId",model:"Hall"}).populate({path:"userId",model:"User"})
        res.status(200).json(get)
    } catch (error) {
        next(error)
    }
}

export const userBooking=async(req,res,next)=>{
    try {
        const get=await Book.find().where('userId').equals(req.params.id).populate({path:"hallId",model:"Hall"})
        res.status(200).json(get)
    } catch (error) {
        next(error)
    }
}
export const getAllBook=async(req,res,next)=>{
    try {
        const get=await Book.find()
        res.status(200).json(get)
    } catch (error) {
        next(error)
    }
}
//------------

export const getHourFilter=async(req,res,next)=>{
    try {
        const get=await Hour.find()
        res.status(200).json(get)
    } catch (error) {
        next(error)
    }
}

export const getOneById=async(req,res,next)=>{
    try {
        const get=await Book.findById({_id:req.params.id})
        res.status(200).json(get)
    } catch (error) {
        next(error)
    }
}

export const updateHourAvailability=async(req,res,next)=>{
    try {
        let get = await Hour.findOne({"hourNumbers._id":req.params.id})
        let hourNo= get.hourNumbers.map((item)=>item.number)
        // console.log(hourNo);//[1]
        let parse=parseInt(hourNo)
        let found=await Hour.updateOne({"hourNumbers._id":req.params.id},{$push:{
            "hourNumbers.$[].unavailableDates":{date:req.body.date,name:req.body.name,
                hallName:req.body.hallName,department:req.body.department,
                reason:req.body.reason,hourNo:parse
            }
        }})
        res.send(found)
    } catch (error) {
        next(error)
    }
}

export const deleteUpdateHourAvailability=async(req,res,next)=>{
    try {
        let updateHour=await Hour.updateOne({"hourNumbers._id":req.params.id},{$pull:{
            "hourNumbers.$[].unavailableDates":{date:req.body.dates}
        }})
        res.status(200).json({data:updateHour,message:"hoursNo deleted "})
    } catch (error) {
        next(error)
    }
}
export const deleteTheirUpdateHourAvailability=async(req,res,next)=>{
    try {
        let updateHour=await Hour.updateOne({"hourNumbers._id":req.params.id},{$pull:{
            "hourNumbers.$[].unavailableDates":{date:req.body.dates}
        }})
        res.status(200).json({data:updateHour,message:"hoursNo deleted "})
    } catch (error) {
        next(error)
    }
}

export const deleteThePast=async(req,res,next)=>{
    try {
        
        let updateHour=await Hour.updateOne({"_id":req.params.id},{$pull:{
            "hourNumbers.$[].unavailableDates":{date:{$lt:req.body.dates}}
        }})
        res.status(200).json({data:updateHour,message:"hoursNo deleted "})
    } catch (error) {
        next(error)
    }
}
export const deleteThePastBetween=async(req,res,next)=>{
    try {
        let updateHour=await Hour.updateOne({"_id":req.params.id},{$pull:{
            "hourNumbers.$[].unavailableDates":{date:{$gte:req.body.fromdates,$lte:req.body.todates}}
        }})

        res.status(200).json({data:updateHour,message:"hoursNo deleted "})
    } catch (error) {
        next(error)
    }
}