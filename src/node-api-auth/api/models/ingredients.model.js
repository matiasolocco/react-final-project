const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ingredientsSchema = new Schema(
  {
    item: { type: String, require: true },
    quantity: { type: Number, require: true }, 
    
  },
  {
    collection: 'ingredients',
  }
);
const Ingredients = mongoose.model('ingredients', foodSchema);
module.exports = Food;