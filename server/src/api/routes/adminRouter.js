import express from "express";
const router = express.Router();
import {
    signup,
    signin,
    signout
} from "../controllers"
import {
    adminSignUpValidator
} from "../middlewares/adminValidator"

router.post("/signup", adminSignUpValidator, signup)
router.post("/signin", signin)
router.get("/signout", signout)

export {
    router
}