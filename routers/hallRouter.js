import express from "express";
import { createHall, updateHall,deleteHall,getById,getByName, getAll} from "../controllers/hallController.js";
import veriftyAdmin from "../middlewares/adminAuth.js";
import verifyToken from "../middlewares/verifyToken.js";
const router=express.Router()

router.post("/",[verifyToken,veriftyAdmin],createHall)
router.put("/:id",updateHall)
router.delete("/:id",deleteHall)
router.get("/find/:id",getById)
router.post("/find",getByName)
router.get("/",getAll)


export default router