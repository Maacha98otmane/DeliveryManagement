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
        role : "DELIVERY_MANAGER",

    }

    const user = new User(UserData);
    user.save((err, User) => {
        if (err) {
            return res.status(400).send(err)
        }
        const DeliveryManagerData = {
            username: username,
            _id: User.id
        }
        try {
            const deliverymanager = new DeliveryManager(DeliveryManagerData);
            deliverymanager.save()
        } catch (error) {
            return res.status(400).json({
                error
            })

        }
        return res.json({
            user,
            deliverymanager
        })

    })
}
const removedeliverymanager = async (req,res)=>{
   
        const {
            id,
        } = req.params
       
       await User.findOneAndRemove({_id: id})
       await DeliveryManager.findOneAndRemove({_id: id})    
            res.json({
                msg:"deleted with success"
            })
        }




export {
    createDeliveryManager,
    removedeliverymanager
}