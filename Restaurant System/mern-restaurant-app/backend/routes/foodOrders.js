const router = require('express').Router();
let FoodOrder = require('../models/foodOrder.model');

router.route('/').get((req, res) => 
{
    FoodOrder.find()
        .then(foodOrders => res.json(foodOrders))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => 
{
    const username = req.body.username;
    const dishList = req.body.dishList;
    const price = Number(req.body.price);
    const isCompleted = req.body.isCompleted;
    const status = req.body.status;

    const newFoodOrder = new FoodOrder
    ({
        username,
        dishList,
        price,
        isCompleted,
        status
    });

    newFoodOrder.save()
        .then(() => res.json('FoodOrder added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => 
{
    FoodOrder.findById(req.params.id)
        .then(foodOrder => res.json(foodOrder))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => 
{
    FoodOrder.findByIdAndDelete(req.params.id)
        .then(() => res.json('FoodOrder deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => 
{
    FoodOrder.findById(req.params.id)
        .then(foodOrder => 
        {
            foodOrder.username = req.body.username;
            foodOrder.dishList = req.body.dishList;
            foodOrder.price = Number(req.body.price);
            foodOrder.isCompleted = req.body.isCompleted;
            foodOrder.status = req.body.status;

            foodOrder.save()
                .then(() => res.json('Dish Updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;