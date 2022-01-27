import express from "express";
const router = express.Router();


import {
    login,
    updateDeliveryStatus,
    logout,
} from "../controllers"

router.post("/login", login)
router.patch("/updateDeliveryStatus/:id", updateDeliveryStatus)
router.get("/logout", logout)

export { router }