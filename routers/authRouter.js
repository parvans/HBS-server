import express from "express";
import { deleteUser,getUser,changePassword,getByToken, login, register,getAll, getProfile, updateUser } from "../controllers/authController.js";
import veriftyAdmin from "../middlewares/adminAuth.js";
import verifyToken from "../middlewares/verifyToken.js";
const router=express.Router()

router.post("/",[verifyToken,veriftyAdmin],register)
router.get("/",getAll)
router.get("/token",verifyToken,getByToken)
router.post("/login",login)
router.delete("/deleteUser/:id",deleteUser)
router.get("/getByEmail",getUser)
router.get("/profile/:id",getProfile)
router.put("/updateuser/:id",[verifyToken,veriftyAdmin],updateUser)
router.put("/changePassword/:id",verifyToken,changePassword)


export default router