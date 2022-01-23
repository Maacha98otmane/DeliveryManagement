const mongoose = require('mongoose');
const User = require('./user')
const deliverymanagerSchema = new mongoose.Schema({
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
},{collection:"deliverymanagers"});
deliverymanagerSchema.pre('remove',async function(next){
  const deliverymanager = this
  await User.deleteOne({_id:deliverymanager.user})
  next()
})
module.exports = mongoose.model('Deliverymanager',deliverymanagerSchema);