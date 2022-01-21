const mongoose = require('mongoose');
const driverSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
      }
}, {
  timestamps: true
},{collection:"drivers"});
module.exports = mongoose.model('Driver',driverSchema);