const mongoose = require('mongoose');
const Dish = mongoose.model('Dish');

const Schema = mongoose.Schema;

const foodOrderSchema = new Schema 
(
    {
        username: {type: String, unique: true, required: true},
        dishList: [{type: Dish.schema}],
        price: {type: Number, required: true},
        isCompleted: {type: Boolean},
        status: {type: String}
    },
    {
        timestamps: true,
    }
);

const FoodOrder = mongoose.model('foodOrder', foodOrderSchema);

module.exports = FoodOrder;