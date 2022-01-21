import express from "express";
const router = express.Router();


import {
    login,
    createDeliveryManager,
    removedeliverymanager,
    logout,
} from "../controllers"
import {
    CreatUserValidator,
    Auth
} from "../middlewares"

router.post("/login", login)
router.get("/logout", logout)
router.post("/CreateDeliveryManager", Auth("MANAGER"), CreatUserValidator, createDeliveryManager)
router.delete("/RemoveDeliveryManager/:id", Auth("MANAGER"), removedeliverymanager)


export { router }