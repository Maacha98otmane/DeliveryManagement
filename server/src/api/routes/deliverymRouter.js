import express from "express";
const router = express.Router();


import {
    login,
    addDelivery,
    deleteDelivery,
    logout,
} from "../controllers"

router.post("/login", login)
router.post("/addDelivery", addDelivery)
router.delete("/deleteDelivery/:id", deleteDelivery)
router.get("/logout", logout)

export { router }