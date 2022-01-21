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
            return res.status(400).send(err)
        }
        const DriverData = {
            username: username,
            _id: User.id
        }
        const drivermanager = new Driver(DriverData);
        drivermanager.save()
        
            return res.json({
                user,
                drivermanager
            })

    })

}
const removedriver = async (req, res) => {

    const {
        id,
    } = req.params

    await User.findOneAndRemove({
        _id: id
    })
    await Driver.findOneAndRemove({
        _id: id
    })
    res.json({
        msg: "deleted with success"
    })
}




export {
    createDriver,
    removedriver
}