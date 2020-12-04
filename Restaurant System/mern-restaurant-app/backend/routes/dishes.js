const router = require('express').Router();
let Dish = require('../models/dish.model');

router.route('/').get((req, res) => 
{
    Dish.find()
        .then(dishes => res.json(dishes))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => 
{
    const name = req.body.name;
    const description = req.body.description;
    const price = Number(req.body.price);

    const newDish = new Dish
    ({
        name,
        description,
        price
    });

    newDish.save()
        .then(() => res.json('Dish added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => 
{
    Dish.findById(req.params.id)
        .then(dish => res.json(dish))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => 
{
    Dish.findByIdAndDelete(req.params.id)
        .then(() => res.json('Excercise deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => 
{
    Dish.findById(req.params.id)
        .then(dish => 
        {
            dish.name = req.body.name;
            dish.description = req.body.description;
            dish.price = Number(req.body.price);

            dish.save()
                .then(() => res.json('Dish Updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;