const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  type: {
    type: String,
    trim: true,
    required: true,
    enum: {
      values: ['National', 'International', 'America', 'Asia', 'Australia'],
      message: 'is not supported'
    }
  },
  zoneType: {
    type: String,
    trim: true,
    enum: {
      values: ['Local', 'Europe', 'America', 'Asia', 'Australia'],
      message: 'is not supported'
    }
  },
  weight: {
    type: Number,
    required: true,
    min: 0,
  },
  from: {
    type: String,
    trim: true,
    required: true,
  },
  to: {
    type: String,
    trim: true,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
    min: 0
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: Number,
    required: true,
    default: "waitlist",
    enum: {
      values: ['waitlist', 'assined', 'accepted', 'received'],
      message: 'is not supported'
    }
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
  },
  vehicleType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VehicleType',
  },
  CreatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DeliveryManager',
  }

}, {
  timestamps: true
},{collection:"deliveries"});
module.exports = mongoose.model('Delivery',deliverySchema);

