import User from "../models/user.js"
import Manager from "../models/manager.js"
const logger = require('../../config/winston');
const EmailSend = require('../helpers/email')


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
            logger.error(err);
            return res.status(400).send(err)

        }
        const ManagerData = {
            username: username,
            user: user._id,
            _id: user._id

        }
        const manager = new Manager(ManagerData);
        manager.save(async (err, Manager) => {
            if (err) {
                const user = await User.findById({
                    _id: user._id
                })
                user.remove()
                logger.error(err);
                return res.status(400).send(err)
            }
            let subj = "Your Login Info";
            let msg = ` email : ${email}
                password : ${password}`;
                
            EmailSend.mail(email, subj, msg)
            logger.info(`Manager user:${req.body.username} created!`);
            return res.json({
                user,
                manager
            })
        })

    })
}
const updateManager = async (req, res) => {
    try {
       if (req.body.username) {
          await Manager.findOneAndUpdate({ _id: req.params.id }, req.body);
       }
       if (req.body.email || req.body.password) {
          const manager = await Manager.findById(id)
          await User.findOneAndUpdate({ _id: manager.user }, req.body)
       }
       logger.info(`Manager user:${req.body.username} Updated!`);
       res.status(200).json({
          status: true,
          message: "Updated successfuly"
       })
    } catch (err) {
        logger.error(err);
       res.status(400).json({
          status: false,
          message: err
       })
    }
 }
const removeManager = async (req, res) => {

    const {
        id,
    } = req.params
    const manager = await Manager.findById({
        _id: id
    })
    manager.remove((err,result)=>{
        if(err){
            logger.error(err);
        }
        logger.info(`Manager user:${manager.username} deleted!`);
        res.status(200).json({
            status: true,
            message: "Deleted successfully"
         })
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
    updateManager,
    getAllManagers,
    getManager
}