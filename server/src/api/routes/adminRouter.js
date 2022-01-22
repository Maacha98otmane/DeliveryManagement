import express from "express";
const router = express.Router();


import {
    loginAdmin,
    logout,
    createManager,
    removeManager
} from "../controllers"

import {
    CreatUserValidator,
    Auth
} from "../middlewares"

router.post("/login", loginAdmin)
router.get("/logout", logout)
router.post("/createManager", Auth("ADMIN"), CreatUserValidator, createManager)
router.delete("/RemoveManager/:id", Auth("ADMIN"), removeManager)

export { router }