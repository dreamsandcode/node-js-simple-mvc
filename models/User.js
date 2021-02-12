const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Let us know you by adding your name']
    },
    email: {
        type: String,
        required: [true, 'Please add your email as well']
    },
    phone: {
        type: String,
        required: false,
        validate: {
            validator: function(v) {
            return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: '{VALUE} is not a valid phone number!'
            }
    }
  });

const User = mongoose.model("User", UserSchema);

module.exports = User;

