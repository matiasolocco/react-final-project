const express = require("express");
const router = express.Router();

const {addAircraft, selectAircraft, updateAircraft, deleteAircraft, selectOneAircraft} = require("../controllers/aircraft.controller")

//1º endpoint para agregar un nuevo avion en el que ha volado el usuario
router.post("/add", addAircraft);
//2º endpoint para ver todos los aviones de tosos los usuarios
router.get("/select", selectAircraft);
//3ª endpoint para buscar a un modelo de avion por su id
router.get("/selectone/:id", selectOneAircraft);
//4º endpoint para actualizar un avion por su id
router.put("/update/:id", updateAircraft);
//5º endpoint para borrar un solo avion por su is
router.delete("/delete/:id", deleteAircraft);

module.exports = router;
