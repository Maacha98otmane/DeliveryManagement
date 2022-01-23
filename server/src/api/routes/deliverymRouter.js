import express from "express";
const router = express.Router();


import {
    login,
    addDelivery,
    logout,
} from "../controllers"

router.post("/login", login)
router.post("/addDelivery", addDelivery)
router.get("/logout", logout)

export { router }