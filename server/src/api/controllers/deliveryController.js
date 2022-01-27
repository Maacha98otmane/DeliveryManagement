import Delivery from "../models/Delivery.js";
import Driver from "../models/driver.js";
const mongoose = require('mongoose');
import {
    getDistance
} from "../helpers/";
import {
    getIDVehicleType
} from "../controllers"
const EmailSend = require('../helpers/email')
const addDelivery = async (req, res) => {

    let deliveryDetails = req.body;

    let distance = await getDistance(req.body.from, req.body.to);

    let additionalData = {
        vehicleType: "",
        distance: distance,
        price: ""
    }

    const weight = deliveryDetails.weight;
    if (req.body.type == "National") {
        if (0 < weight && weight <= 3) {
            additionalData.price = weight * 40
        } else {
            additionalData.price = (weight - 3) * 5 + 120;
        }
    }else{
        switch( req.body.zoneType ){ // 'Europe', 'America', 'Asia', 'Australia'
            
            case "Europe":
                additionalData.price = weight * 160
            break;
            case "America":
                additionalData.price = weight * 220
            break;
            case "Asia":
                additionalData.price = weight * 240
            break;
            case "Australia":
                additionalData.price = weight * 260
            break;
        }
    }
    if (0 < weight && weight <= 200) { // CAR CONDITION
        additionalData.vehicleType = await getIDVehicleType("car")
    } else if (200 < weight && weight <= 800) { // SMALL STRUCK CONDITION
        additionalData.vehicleType = await getIDVehicleType("small truck")
    } else if (800 < weight && weight <= 1600) { // BIG TRUCK CONDITION
        additionalData.vehicleType = await getIDVehicleType("big truck")
    }



    Object.assign(deliveryDetails, additionalData);

    try {
        const delivery = await Delivery.create(deliveryDetails);
        return res.status(201).json({
            status: true,
            message: delivery,
        });
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: err,
        });
    }
};
const asignDelivery = async(req,res)=>{
    const {
        id,
     } = req.params
    const delivery =await Delivery.findOne({ _id: id}).populate("createdBy").populate("vehicleType")
    const drivers =await Driver.find({ VehicleType: delivery.vehicleType._id}).populate("user")
    if(drivers.length != 0){
        var check =false
        console.log("before",check)

         await drivers.forEach(
            async function(element) {
                console.log("driver",element._id)

/*  */

const dd = await Delivery.exists({driver : element._id , status : "Accepted"})
                if(!dd){
                    console.log(element.user.email)
                    let subj = "Delivery available Check it Now!";
                    let msg = ` Go to the site`;
                    // EmailSend.mail(element.user.email, subj, msg)
                    check=true

                }

/*  */

                // const dd = await Delivery.findOne({ $and: [ { driver: { $in: [ element._id ]} }, { status: { $ne: "Received" } } ] } )
                // console.log(dd)
                // if(!dd){
                //     console.log(element.user.email)
                //     let subj = "Delivery available Check it Now!";
                //     let msg = ` Go to the site`;
                //     EmailSend.mail(element.user.email, subj, msg)
                // }
            }      
        
            );
        console.log("after",check)
        // delivery.status ="Pending"
        // await delivery.save()
    
        // res.status(200).json({
        //     status: true,
        //     msg:"Change status to Pending"
        //  })
    }else{
        res.status(400).json({
            status: false,
            msg:"No Driver available now. Check it later"
         })
    }
    
}

const removeDelivery = async(req,res)=>{
    try {
        const { id } = req.params
        const doc = await Delivery.findById({ _id: id })
        if (doc) {
            // delete
            if (doc.status == "WaitList") {

                await doc.remove()
                res.status(200).json({
                    status: true,
                    message: "Deleted successfully"
                })
            } else {
                res.status(404).json({
                    status: false,
                    message: "You Can't deleted"
                })
            }
        } else {
            res.status(404).json({
                status: false,
                message: "Not Found"
            })
        }
     } catch (err) {
        res.status(400).json({
           status: false,
           message: err
        })
     }
}

const getDelivery = async (req, res) => {
    const id = req.params.id
    try {
        const doc = await Delivery.findById({ _id: id })
        if (doc) {

            res.status(200).json({
                status: true,
                message: doc
            })
        } else {
            res.status(200).json({
                status: false,
                message: "Not Found"
            })
        }

    } catch (err) {
        res.status(400).json({
            status: false,
            message: err.message
        })
    }
}
const getAllDeliveries = async (req, res) => {

    try {
        const docs = await Delivery.find()
        if (docs) {

            res.status(200).json({
                status: true,
                message: docs
            })
        } else {
            res.status(200).json({
                status: false,
                message: "Not Found"
            })
        }

    } catch (err) {
        res.status(400).json({
            status: false,
            message: err.message
        })
    }
}
const updateDeliveryStatus = async (req, res) => {
    try {
        const id = req.params.id
        const reqStatus = req.body.status
        const doc = await Delivery.findById({ _id: id })
        if (reqStatus == "Pending" && doc.status == "WaitList" || reqStatus == "Accepted" && doc.status == "Pending"|| reqStatus == "Received" && doc.status == "Accepted") {
            await Delivery.updateOne({ _id: id }, { status: reqStatus })
            res.status(200).json({
                status: true,
                message: "Updated successfully"
            })
        }
        else {
            res.status(404).json({
                status: false,
                message: "You Can't Updated"
            })
        }

    } catch (e) {
        res.status(400).json({
            status: false,
            message: e.message
        })
    }
}


export {
    addDelivery,
    removeDelivery,
    getDelivery,
    updateDeliveryStatus,
    getAllDeliveries,
    asignDelivery
};