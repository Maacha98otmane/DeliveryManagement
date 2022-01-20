const mongoose = require('mongoose');
const crypto = require('crypto')
import { v4 as uuidv4 } from 'uuid';
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    trim: true,
    required: true,
  },
  hashed_password: {
    type: String,
    required: true,
  },
  salt: {
    type: String
  }
}, {
  timestamps: true
},{collection:"users"});
//Create virtual champs 'password'
userSchema.virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.hashed_password = this.cryptPass(password)
  })
  .get(function () {
    return this._password
  })
//Create method for crypt password
userSchema.methods = {
  authenticate: function(pass){
    return this.cryptPass(pass) === this.hashed_password;
  },
  cryptPass: function (password) {
    if (!password) return '';
    try {
      return crypto.createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return ''
    }
  }
}
module.exports = mongoose.model('User',userSchema);