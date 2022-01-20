const Manager = require('../models/manager')
const jwt = require('jsonwebtoken')
const signup =  (req, res) => {

    try {
        // await new Admin(UserData).save();
         db.collection('users').insertOne( {
            "email" : req.body.email,
            "role":req.body.role,
            "password" : req.body.password,
         },function(err, result) {
            // console.log("Record added as "+result.insertedId);
            db.collection('managers').insertOne( {
                "username" : req.body.username,
                "_id" : result.insertedId,
             })
       });
        // await new User(PersonalData).save()
        console.log("inserted");
      } catch (error) {
        console.log(error);
      } 

    // const admin = new Admin(req.body);
    // admin.save((err, admin) => {
    //     if (err) {
    //         return res.status(400).send(err)
    //     }
    //     res.send(admin)
    // })

}
// const signin = (req, res) => {

//     const {
//         email,
//         password
//     } = req.body;
//     Admin.findOne({
//         email
//     }, (err, admin) => {
//         if (err || !admin) {
//             return res.status(400).json({
//                 error: 'User not Found with this email@'
//             })
//         }
//         if (!admin.authenticate(password)) {
//             return res.status(401).json({
//                 error: 'Email and Password dont Match !'
//             })
//         }
//         const token = jwt.sign({
//             data: admin
//         }, process.env.JWT_SecretAdmin, {
//             expiresIn: "24h"
//         })
//         res.cookie('token', token, {
//             expires: new Date(Date.now() + 4 * 3600000)
//         })
//         return res.json({
//             token,
//             admin
//         })

//     })


// }
const signout = (req, res) => {
    res.clearCookie('token');
    res.json({
        message: "Manager Logout"
    })
}

export {
    signup,
    // signin,
    signout
}