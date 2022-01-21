import express from "express";
const router = express.Router();


import {
    login,
    createDriver,
    removedriver,
    logout,
} from "../controllers"
import {
    CreatUserValidator,
    Auth
} from "../middlewares"

router.post("/login", login)

router.post("/CreateDriver", Auth("DELIVERY_MANAGER"), CreatUserValidator, createDriver)
router.delete("/RemoveDriver/:id", Auth("DELIVERY_MANAGER"), removedriver)

router.get("/logout", logout)

export { router }