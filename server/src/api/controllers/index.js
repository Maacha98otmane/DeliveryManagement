export {
    loginAdmin,
}
from "./adminController"

export {
    createManager,
    removeManager,
    updateManager,
    getAllManagers,
    getManager
}
from "./managerController"
export {
    createDeliveryManager,
    removeDeliveryManager,
    getAllDeliveryManager,
    getDeliveryManager
}
from "./deliverymanagerController"
export {
    createDriver,
    removeDriver,
    getAllDrivers,
    getDriver
}
from "./driverController"

export {
    login,
    logout
}
from "./authController"

export {
    getVehicleType,
    getAllVehicleType,
    addVehicleType,
    deleteVehicleType,
    updateVehicleType
}
from "./vehicleTypeController";

export {
    addDelivery
}
from "./deliveryController";