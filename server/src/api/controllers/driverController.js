import User from "../models/user.js"
import Driver from "../models/driver"


const createDriver = (req, res) => {

    const {
        username,
        email,
        password,
    } = req.body;

    const UserData = {
        email,
        password,
        role: "DRIVER",

    }

    const user = new User(UserData);
    user.save((err, User) => {
        if (err) {
            return res.status(400).send({
                status: false,
                mes: err
            })
        }
        const DriverData = {
            username: username,
            user: user._id
        }
        const driver = new Driver(DriverData);
        driver.save()
        
            return res.json({
                status: true,
                user,
                driver
            })

    })

}
const removeDriver = async (req, res) => {

    const {
        id,
    } = req.params
    const driver =await Driver.findById({_id:id})
    driver.remove()
    res.json({
        msg: "deleted with success"
    })
}

const getAllDrivers = async (req, res) => {
    try {
        const drivers = await Driver.find().populate("user")
        res.status(200).json({
            status: true,
            drivers

        })
    } catch (err) {
        res.status(400).json({
            status: false,
            msg: err
        })
    }
}

const getDriver = async (req, res) => {
    const id = req.params.id
    try {
        const driver = await Driver.findById({ _id: id }).populate("user")
        res.status(200).json({
            status: true,
            driver
        })
    } catch (err) {
        res.status(400).json({
            status: false,
            msg: err
        })
    }
}




export {
    createDriver,
    removeDriver,
    getAllDrivers,
    getDriver

}