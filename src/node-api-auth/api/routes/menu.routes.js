
const express = require('express');
const router = express.Router();

const { addMenu, selectMenu, selectOneMenu, updateMenu, deleteMenu} = require("../controllers/food.controller")

//1º endpoint para agregar un menu
router.post("/add", addMenu);
//2º endpoint para ver todos los menu
router.get("/select", selectMenu);
//3ª endpoint para buscar a un menu por su id
router.get("/selectone/:id", selectOneMenu);
//4º endpoint para actualizar un menu por su id
router.put("/update/:id", updateMenu);
//5º endpoint para borrar un solo menu por su id
router.delete("/delete/:id", deleteMenu);


module.exports = router;
