import User from "../models/user.js"
import Driver from "../models/driver"
const EmailSend = require('../helpers/email')


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
            user: user._id,
            _id: user._id,
            VehicleType: req.body.vehicleId

        }
        const driver = new Driver(DriverData);
        driver.save()
        let subj = "Your Login Info";
        let msg = ` email : ${email}
                password : ${password}`;

        EmailSend.mail(email, subj, msg)
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
    const driver = await Driver.findById({
        _id: id
    })
    driver.remove()
    res.json({
        msg: "deleted with success"
    })
}
const updateDriver = async (req, res) => {
    try {
        if (req.body.username) {
            await Driver.findOneAndUpdate({ _id: req.params.id }, req.body);
        }
        if (req.body.email || req.body.password) {
            const driver = await Driver.findById(id)
            await User.findOneAndUpdate({ _id: driver.user }, req.body)
        }
        res.status(200).json({
            status: true,
            message: "Updated successfully"
        })
    } catch (err) {
        res.status(400).json({
            status: false,
            message: err
        })
    }
}
const getAllDrivers = async (req, res) => {
    try {
        const drivers = await Driver.find().populate("user").populate("VehicleType")
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
        const driver = await Driver.findById({
            _id: id
        }).populate("user").populate("VehicleType")
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
    updateDriver,
    getAllDrivers,
    getDriver

}