const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const foodSchema = new Schema(
  {
    category: { type: String, require: true },
    name: { type: String, require: true  },
    ingredients:[{ type: Schema.ObjectId, ref: 'ingredients' }],
    
  },
  {
    collection: 'food',
  }
);
const Food = mongoose.model('food', foodSchema);
module.exports = Food;