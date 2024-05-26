
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema(
  {
  day: { type: String, require: true },
  category: { type: String, require: true },
  food: [{ type: Schema.ObjectId, ref: 'food' }],
},
{
  collection: 'menu',
});

const Menu = mongoose.model('menu', menuSchema);
module.exports = Menu;
