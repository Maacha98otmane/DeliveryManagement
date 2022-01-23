import express from "express";
const router = express.Router();


import {
    login,
    createDeliveryManager,
    removeDeliveryManager,
    getAllDeliveryManager,
    getDeliveryManager,
    createDriver,
    removeDriver,
    getAllDrivers,
    getDriver,
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
router.delete("/RemoveDeliveryManager/:id", Auth("MANAGER"), removeDeliveryManager)
router.get("/getAllDeliveryManager", Auth("MANAGER"), getAllDeliveryManager)
router.get("/getDeliveryManager/:id", Auth("MANAGER"), getDeliveryManager)

// process Driver
router.post("/CreateDriver", Auth("MANAGER"),CreatUserValidator, createDriver)
router.delete("/RemoveDriver/:id", Auth("MANAGER"),removeDriver)
router.get("/getAllDrivers", Auth("MANAGER"),getAllDrivers)
router.get("/getDriver/:id", Auth("MANAGER"),getDriver)


//create
//update
//

export { router }