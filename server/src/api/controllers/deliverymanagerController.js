import User from "../models/user.js"
import DeliveryManager from "../models/deliverymanager"
const EmailSend = require('../helpers/email')


const createDeliveryManager = (req, res) => {

    const {
        username,
        email,
        password,
    } = req.body;

    const UserData = {
        email,
        password,
        role: "DELIVERY_MANAGER",

    }

    const user = new User(UserData);
    user.save((err, User) => {
        if (err) {
            return res.status(400).send({
                status: false,
                mes: err
            })
        }
        const DeliveryManagerData = {
            username: username,
            _id: user._id,
            user: user._id
        }
        const deliveryManager = new DeliveryManager(DeliveryManagerData);
        deliveryManager.save()
        let subj = "Your Login Info";
            let msg = ` email : ${email}
                password : ${password}`;
                
        EmailSend.mail(email, subj, msg)
        return res.status(201).json({
            status: true,
            user,
            deliveryManager
        })

    })

}
const removeDeliveryManager = async (req, res) => {

    const {
        id,
    } = req.params
    const deliverymanager =await DeliveryManager.findById({_id:id})
    deliverymanager.remove()
    res.json({
        msg: "deleted with success"
    })
}
const updateDeliveryManager = async (req, res) => {
    try {
        if (req.body.username) {
            await DeliveryManager.findOneAndUpdate({ _id: req.params.id }, req.body);
        }
        if (req.body.email || req.body.password) {
            const deliverymanager = await DeliveryManager.findById(id)
            await User.findOneAndUpdate({ _id: deliverymanager.user }, req.body)
        }
        res.status(200).json({
            status: true,
            message: "Updated successfuly"
        })
    } catch (err) {
        res.status(400).json({
            status: false,
            message: err
        })
    }
}
const getAllDeliveryManager = async (req, res) => {
    try {
        const deliveriesmanager = await DeliveryManager.find().populate("user")
        res.status(200).json({
            status: true,
            deliveriesmanager

        })
    } catch (err) {
        res.status(400).json({
            status: false,
            msg: err
        })
    }
}

const getDeliveryManager = async (req, res) => {
    const id = req.params.id
    try {
        const deliverymanager = await Driver.findById({ _id: id }).populate("user")
        res.status(200).json({
            status: true,
            deliverymanager
        })
    } catch (err) {
        res.status(400).json({
            status: false,
            msg: err
        })
    }
}


export {
    createDeliveryManager,
    removeDeliveryManager,
    updateDeliveryManager,
    getAllDeliveryManager,
    getDeliveryManager
}