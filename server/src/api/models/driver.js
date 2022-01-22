const mongoose = require('mongoose');
const driverSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      }
}, {
  timestamps: true
},{collection:"drivers"});
module.exports = mongoose.model('Driver',driverSchema);