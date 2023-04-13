import express from "express";
import {createBook, deleteBook, getAllBook, updateBook} from "../controllers/BookController.js";
import veriftyAdmin from "../middlewares/adminAuth.js";
import verifyToken from "../middlewares/verifyToken.js";
import { getById } from "../controllers/hallController.js";
import { getAll } from "../controllers/authController.js";

const router=express.Router()

router.post("/:hallId",createBook)
router.put("/:id",updateBook)
router.delete("/:id/:hallId",[verifyToken,veriftyAdmin],deleteBook)
router.get("/find/:id",getById)
router.get("/",getAll)
router.get("/getAllBooking",[verifyToken,veriftyAdmin],getAllBook)
// router.get("/filter/",getHourFilter)
// router.put("/availability/:id",updateHourAvailability)
// router.put("/deleteavailability/:id",[verifyToken,veriftyAdmin],deleteUpdateHourAvailability)
// router.put("/deletetheiravailability/:id",deleteTheirUpdateHourAvailability)
// router.put("/deleteThePast/:id",deleteThePast)
// router.put("/deleteThePastBetween/:id",[verifyToken,veriftyAdmin],deleteThePastBetween)

export default router