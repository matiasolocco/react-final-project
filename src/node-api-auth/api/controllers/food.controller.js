const Food = require("../models/food.model");

const addFood = async (req, res) => {
    try {
        console.log(req.body);
        const newFood = new Food(req.body);
        const findFood = await Food.find({ name: req.body.name });
        console.log(findFood);
        if (findFood.length !== 0) {
            return res.json({ message: "Esta comida ya se ha creado" });
        }
        const createdFood = await newFood.save();
        return res.json(createdFood);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

const selectFood = async (req, res) => {
    try {
        const foods = await Food.find();
        return res.status(200).json(foods);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

const selectOneFood = async (req, res) => {
    try {
        const { id } = req.params;
        const findFood = await Food.findOne({ _id: id });
        return res.status(200).json(findFood);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

const updateFood = async (req, res) => {
    try {
        const { id } = req.params;
        const foodBody = new Food(req.body);
        foodBody._id = id;
        const updateFood = await Food.findByIdAndUpdate(id, foodBody, { new: true });
        console.log(updateFood);
        if (!updateFood) {
            return res.status(404).json({ message: "Esta comida no existe" });
        }
        return res.status(200).json(updateFood);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

const deleteFood = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteFood = await Food.findByIdAndDelete(id);
        if (!deleteFood) {
            return res.status(404).json({ message: "Esta comida no existe" });
        }
        return res.status(200).json(deleteFood);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

module.exports = { addFood, selectFood, selectOneFood, updateFood, deleteFood };
