"use strict";
import Delivery from "../models/Delivery.js";
import {
    getDistance
} from "../helpers/";

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
        console.log("inside National");
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
        additionalData.vehicleType = "61ec2a8837ec5066e6615491"
    } else if (200 < weight && weight <= 800) { // SMALL STRUCK CONDITION
        additionalData.vehicleType = "61ec2ab837ec5066e6615493"
    } else if (800 < weight && weight <= 1600) { // BIG TRUCK CONDITION
        additionalData.vehicleType = "61ec2ba1bfb5bc0c8f63d810"
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
            message: err.message,
        });
    }
};
const asignDelivery = async(req,res)=>{
    
}
const deleteDelivery = async(req,res)=>{
    try {
        const {
           id,
        } = req.params
  
        await Delivery.findOneAndRemove({ _id: id },{status:"waitlist"})
        res.status(200).json({
           status: true,
           message: "deleted successfully"
        })
     } catch (err) {
        res.status(400).json({
           status: false,
           message: err
        })
     }
}

export {
    addDelivery,
    deleteDelivery,
    asignDelivery
};