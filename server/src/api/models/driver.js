const mongoose = require('mongoose');
const User = require('./user');
const driverSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      VehicleType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VehicleType',
      }
}, {
  timestamps: true
},{collection:"drivers"});
driverSchema.pre('remove',async function(next){
  const driverdeleted = this
  await User.deleteOne({_id:driverdeleted.user})
  next()
})
module.exports = mongoose.model('Driver',driverSchema);