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
    updateDriver,
    getAllDrivers,
    getAllVehicleType,
    addVehicleType,
    getVehicleType,
    deleteVehicleType,
    updateVehicleType,
    updateDeliveryManager,
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
router.patch("/updateDeliveryManager/:id", Auth("MANAGER"), updateDeliveryManager)
router.get("/getAllDeliveryManager", Auth("MANAGER"), getAllDeliveryManager)
router.get("/getDeliveryManager/:id", Auth("MANAGER"), getDeliveryManager)

// process Driver
router.post("/CreateDriver", Auth("MANAGER"), CreatUserValidator, createDriver)
router.delete("/RemoveDriver/:id", Auth("MANAGER"), removeDriver)
router.patch("/updateDriver/:id", Auth("MANAGER"), updateDriver)
router.get("/getAllDrivers", Auth("MANAGER"), getAllDrivers)
router.get("/getDriver/:id", Auth("MANAGER"), getDriver)


// VEHICLE TYPE 
router.get("/getAllVehicleType", getAllVehicleType);
router.post("/addVehicleType", addVehicleType);
router.get("/getVehicleType/:id", getVehicleType);
router.delete("/deleteVehicleType/:id", deleteVehicleType);
router.put("/updateVehicleType/:id", updateVehicleType);


export {
    router
}