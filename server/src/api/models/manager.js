const mongoose = require('mongoose');
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
module.exports = mongoose.model('Manager',managerSchema);