import VehicleType from "../models/VehicleType.js";

const getVehicleType = async (req, res) => {

    const { id } = req.params
    try {
        const doc = await VehicleType.find({_id : id});
        return res.status(200).json({
            status : true,
            message : doc
        })
    }catch(err){
        return res.status(400).json({
            status : false,
            message: err.message
        })
    }
    
}

const getAllVehicleType = async (req, res) => {

    try {
        const docs = await VehicleType.find();
        return res.status(200).json({
            status : true,
            message : docs
        })
    }catch(err){
        return res.status(400).json({
            status : false,
            message: err.message
        })
    }
    
}
const getIDVehicleType = async (name) => {

    try {

        return await VehicleType.findOne({ name: name }).select({ _id: 1 });
    } catch (err) {
        return null
    }
    
}

const addVehicleType = async (req, res) => {

    try{
        const { name } = req.body  
        const vehicleType = await VehicleType.create({ name });
        return res.status(201).json({
            status : true,
            message : vehicleType
        })
    }catch(err){
        return res.status(400).json({
            status : false,
            message: err.message
        })
    }
}

const deleteVehicleType = async (req, res) => {

    try {
        const {
           id,
        } = req.params
  
        await VehicleType.findOneAndRemove({ _id: id })
        res.status(200).json({
           status: true,
           message: "deleted successfully"
        })
     } catch (e) {
        res.status(400).json({
           status: false,
           message: e.message
        })
     }
}

const updateVehicleType = async (req, res) => {

    try {
        const { id } = req.params;
        const { name } = req.body;
        await VehicleType.findOneAndUpdate({id}, {name});

        res.status(200).json({
           status: true,
           message: "updated successfully"
        })
     } catch (e) {
        res.status(400).json({
           status: false,
           message: e.message
        })
     }
}



export { getVehicleType ,getAllVehicleType ,getIDVehicleType, addVehicleType, deleteVehicleType, updateVehicleType}
