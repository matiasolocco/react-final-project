const express = require("express");
const router = express.Router();

const { addAirline, selectAirline, selectOneAirline, updateAirline, deleteAirline} = require("../controllers/airlines.controller")

//1º endpoint para agregar una aerolinea
router.post("/add", addAirline);
//2º endpoint para ver todas las aerolineas
router.get("/select", selectAirline);
//3ª endpoint para buscar a una aerolinea por su id
router.get("/selectone/:id", selectOneAirline);
//4º endpoint para actualizar una aerolinea por su id
router.put("/update/:id", updateAirline);
//5º endpoint para borrar una sola aerolinea por su is
router.delete("/delete/:id", deleteAirline);


module.exports = router;