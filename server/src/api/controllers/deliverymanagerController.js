import User from "../models/user.js"
import DeliveryManager from "../models/deliverymanager"


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
            user: user._id
        }
        const deliverymanager = new DeliveryManager(DeliveryManagerData);
        deliverymanager.save()

        return res.status(201).json({
            status: true,
            user,
            deliverymanager
        })

    })

}
const removeDeliveryManager = async (req, res) => {

    const {
        id,
    } = req.params

    await User.findOneAndRemove({
        _id: id
    })
    await DeliveryManager.findOneAndRemove({
        _id: id
    })
    res.json({
        msg: "deleted with success"
    })
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
    getAllDeliveryManager,
    getDeliveryManager
}