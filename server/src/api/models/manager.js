const mongoose = require('mongoose');
const User = require('./user')
const managerSchema = new mongoose.Schema({
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
},{collection:"managers"});
managerSchema.pre('remove',async function(next){
  const managerdeleted = this
  await User.deleteOne({_id:managerdeleted.user})
  next()
})
module.exports = mongoose.model('Manager',managerSchema);