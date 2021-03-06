import express from "express";
const router = express.Router();


import {
    loginAdmin,
    logout,
    createManager,
    getAllManagers,
    updateManager,
    getManager,
    removeManager
} from "../controllers"

import {
    CreatUserValidator,
    Auth
} from "../middlewares"

router.post("/login", loginAdmin)
router.get("/logout", logout)
router.post("/createManager", CreatUserValidator, createManager)
router.get("/getAllManagers", Auth("ADMIN"), getAllManagers)
router.get("/getManager/:id", Auth("ADMIN"), getManager)
router.patch("/updateManager/:id", updateManager)
router.delete("/RemoveManager/:id", Auth("ADMIN"), removeManager)

export { router }