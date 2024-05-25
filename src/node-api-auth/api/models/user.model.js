const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, require: true },
    lastname: { type: String, require: true },
    menu: [{ type: Schema.ObjectId, ref: 'menu'}], 
    food: [{ type: Schema.ObjectId, ref: 'food'}],
    ingredients: [{ type: Schema.ObjectId, ref: 'ingredients'}],
    email: { type: String, require: true },
    password: { type: String, require: true },
    role: {
      type: String,
      default: 'user',
      enum: ['admin', 'user'],
    } 
  },
  {
    collection: 'user',
  }
);
const User = mongoose.model('user', userSchema);
module.exports = User;
