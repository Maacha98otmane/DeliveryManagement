import User from "../models/user.js"
import Manager from "../models/manager.js"


const createManager = (req, res) => {

    const {
        username,
        email,
        password,
    } = req.body;

    const UserData = {
        email,
        password,
        role: "MANAGER",

    }

    const user = new User(UserData);
    user.save((err, User) => {
        if (err) {
            return res.status(400).send(err)
        }
        const ManagerData = {
            username: username,
            user: user._id
        }
        const manager = new Manager(ManagerData);
        manager.save()
        return res.json({
            user,
            manager
        })

    })
}
const removeManager = async (req, res) => {

    const {
        id,
    } = req.params

    await User.findOneAndRemove({
        _id: id
    })
    await Manager.findOneAndRemove({
        _id: id
    })
    res.json({
        msg: "deleted with success"
    })
}

const getAllManagers = async (req, res) => {
    try {
        const managers = await Manager.find().populate("user")
        res.status(200).json({
            status: true,
            managers

        })
    } catch (err) {
        res.status(400).json({
            status: false,
            msg: err
        })
    }
}

const getManager = async (req, res) => {
    const id = req.params.id
    try {
        const manager = await Manager.findById({
            _id: id
        }).populate("user")
        res.status(200).json({
            status: true,
            manager
        })
    } catch (err) {
        res.status(400).json({
            status: false,
            msg: err
        })
    }
}


export {
    createManager,
    removeManager,
    getAllManagers,
    getManager
}