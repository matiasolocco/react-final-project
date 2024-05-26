const express = require("express");
const router = express.Router();

const { addFood, selectFood, updateFood, deleteFood, selectOneFood } = require("../controllers/menu.controller");

//1º endpoint para agregar una nueva comida
router.post("/add", addFood);
//2º endpoint para ver todas las comidas
router.get("/select", selectFood);
//3º endpoint para buscar una comida por su id
router.get("/selectone/:id", selectOneFood);
//4º endpoint para actualizar una comida por su id
router.put("/update/:id", updateFood);
//5º endpoint para borrar una comida por su id
router.delete("/delete/:id", deleteFood);

module.exports = router;
