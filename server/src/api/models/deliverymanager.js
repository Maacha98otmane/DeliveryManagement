const mongoose = require('mongoose');
const deliverymanagerSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
      }
}, {
  timestamps: true
},{collection:"deliverymanagers"});
module.exports = mongoose.model('Deliverymanager',deliverymanagerSchema);