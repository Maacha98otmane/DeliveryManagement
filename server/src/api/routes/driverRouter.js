import express from "express";
const router = express.Router();


import {
    login,
    logout,
} from "../controllers"

router.post("/login", login)
router.get("/logout", logout)

export { router }