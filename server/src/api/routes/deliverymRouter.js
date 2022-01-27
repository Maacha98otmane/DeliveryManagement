import express from "express";
const router = express.Router();


import {
    login,
    addDelivery,
    getDelivery,
    getAllDeliveries,
    asignDelivery,
    removeDelivery,
    logout,
} from "../controllers"
import {
    Auth
} from "../middlewares"

router.post("/login", login)
router.post("/addDelivery", Auth("DELIVERY_MANAGER"),addDelivery)
router.delete("/removeDelivery/:id", removeDelivery)
router.post("/asignDelivery/:id", asignDelivery)
router.get("/getDelivery:/:id", getDelivery)
router.get("/getAllDeliveries", getAllDeliveries)
router.get("/logout", logout)

export { router }