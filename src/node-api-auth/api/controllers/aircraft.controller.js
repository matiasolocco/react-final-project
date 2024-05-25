const Aircraft = require('../models/aircraft.model');
const Airline = require('../models/airlines.model');

//1º endpoint CRUD (Create) --> añadir nuevos aviones
//Prueba postman ruta aircraft/add: OK
const addAircraft = async (req, res) => {
  try {
    console.log(req.body);
    const newAircraft = new Aircraft(req.body);
    const createdAircraft = await newAircraft.save();
    return res.json(createdAircraft);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

//2º endpoint CRUD (Read) --> buscar aviones
//Prueba postman ruta aircraft/select: OK
const selectAircraft = async (req, res) => {
    try {
      const aircrafts = await Aircraft.find()
      .populate({ path: 'airline', select: 'name' })//para filtrar solamente el nombre de la aerolinea
  
      return res.status(200).json(aircrafts);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
   
}
//3º endpoint CRUD (Read) --> busco 1 solo avión (id: 66321438b5d0e83cab2a0f68)
//Prueba postman ruta aircraft/selectone/:id : OK
const selectOneAircraft = async (req, res) => {
  try {
      const { id } = req.params;
      const findAicraft = await Aircraft.findOne({ _id: id })
      return res.status(200).json(findAicraft)

  } catch (error) {
      console.log(error)
      return res.status(500).json(error)
  }
}

//4º endpoint CRUD (Update) --> modifico el año de un avión (id: 66321438b5d0e83cab2a0f68)
//Prueba postman ruta aircraft/update: OK

const updateAircraft = async (req, res) => {
  try {
    const idAircraft = req.params.id;
    const idAirline = req.body.id;
    console.log(idAircraft, idAirline);
    const modifyAircraft = await Aircraft.findByIdAndUpdate(
      idAircraft,
      //RELACION CON EL MODELO ARILINE
      { $push: { airline: idAirline } },//Se hace un push para agregar la aerolinea que ya tenemos cargada y que puede compartir con otros aviones
      { new: true }
    );
    return res.status(200).json(modifyAircraft);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

//5º endpoint CRUD (Delete) --> elimino un avión ( id: 66321408b5d0e83cab2a0f62)
//Prueba Postman ruta aircraft/delete/:id : OK
const deleteAircraft = async (req, res) => {
  try {
      const id = req.params.id;
      const deleteAircraft = await Aircraft.findByIdAndDelete(id);
      if (!deleteAircraft) {
          return res.status(404).json({ message: "This aircraft does not exists" })
      }
      return res.status(200).json(deleteAircraft)
  } catch (error) {
      console.log(error)
      return res.status(500).json(error)
  }

}

module.exports = {addAircraft, selectAircraft, selectOneAircraft, updateAircraft, deleteAircraft};
