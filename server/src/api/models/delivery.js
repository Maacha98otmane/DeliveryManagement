const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  type: {
    type: String,
    trim: true,
    required: true,
    enum: {
      values: ['National', 'International'],
      message: 'is not supported'
    }
  },
  zoneType: {
    type: String,
    trim: true,
    enum: {
      values: ['local','Europe', 'America', 'Asia', 'Australia'],
      message: 'is not supported'
    },
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
    min: 0
  },
  price: {
    type: Number,
    min: 0
  },
  status: {
    type: String,
    default: "WaitList",
    enum: {
      values: ['WaitList', 'Pending', 'Accepted', 'Received'],
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
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }

}, {
  timestamps: true
},{collection:"deliveries"});

module.exports = mongoose.model('Delivery',deliverySchema);

