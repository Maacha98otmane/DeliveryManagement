const Admin = require('../models/admin')
import { createToken } from "../helpers";

// const User = require('../models/user')
// const Manager = require('../models/Manager')
// const jwt = require('jsonwebtoken')
const signup = (req, res) => {

    const admin = new Admin(req.body);
    admin.save((err, admin) => {
        if (err) {
            return res.status(400).send(err)
        }
        res.send(admin)
    })

}
const loginAdmin = (req, res) => {

    const {
        email,
        password
    } = req.body;

    Admin.findOne({
        email
    }, (err, admin) => {
        if (err || !admin) {
            return res.status(400).json({
                isLogged: false,
                error: 'User not Found with this email@'
            })
        }
        if (!admin.authenticate(password)) {
            return res.status(401).json({
                isLogged: false,
                error: 'Email and Password dont Match !'
            })
        }

        const token = createToken({ admin }, "ADMIN");
        res.cookie('token', token, {
            expires: new Date(Date.now() + 4 * 3600000)
        })
        return token
            ? res.status(200).json({ isLogged: true, token })
            : res.status(500).json({ isLogged: false, error: "cant create token" });
    })


}
// const createmanager =  (req,res)=>{
//     const {
//         username,
//         email,
//         password,
//       } = req.body;

//       const UserData = {
//         email,
//         password,
//         role="MANAGER",

//       }

//     const user = new User(UserData);
//     user.save((err, User) => {
//         if (err) {
//             return res.status(400).send(err)
//         }
//         const ManagerData = {
//             username :username,
//             _id: User.id
//           }
//           try {
//               const manager = new Manager(ManagerData);
//               manager.save()
//           } catch (error) {
//             return res.status(400).json({ error })

//           }
//           res.json({ user, manager })

//     })
    
// }
 
    
// }
// const signout = (req, res) => {
//     res.clearCookie('token');
//     res.json({
//         message: "Admin Logout"
//     })
// }

export {
    loginAdmin,
}