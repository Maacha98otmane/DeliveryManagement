import express from "express";
const router = express.Router();


import {
    login,
    createDeliveryManager,
    removedeliverymanager,
    createDriver,
    removedriver,
    logout,
} from "../controllers"
import {
    CreatUserValidator,
    Auth
} from "../middlewares"

router.post("/login", login)
router.get("/logout", logout) 
// process deliveryManager
router.post("/CreateDeliveryManager", Auth("MANAGER"), CreatUserValidator, createDeliveryManager)
router.delete("/RemoveDeliveryManager/:id", Auth("MANAGER"), removedeliverymanager)

// process Driver
router.post("/CreateDriver", Auth("MANAGER"), CreatUserValidator, createDriver)
router.delete("/RemoveDriver/:id", Auth("MANAGER"), removedriver)

export { router }