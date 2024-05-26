const Menu = require('../models/menu.model');
const Food = require('../models/food.model');

//1º endpoint CRUD (Create) --> añadir nuevos menús
//Prueba postman ruta menu/add: OK
const addMenu = async (req, res) => {
  try {
    console.log(req.body);
    const newMenu = new Menu(req.body);
    const createdMenu = await newMenu.save();
    return res.json(createdMenu);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

//2º endpoint CRUD (Read) --> buscar menús
//Prueba postman ruta menu/select: OK
const selectMenu = async (req, res) => {
    try {
      const menus = await Menu.find()
      .populate({ path: 'food', select: 'name igredients' })//para filtrar solamente el nombre de la comida
  
      return res.status(200).json(menus);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
   
}
//3º endpoint CRUD (Read) --> 
//Prueba postman ruta menu/selectone/:id : OK
const selectOneMenu = async (req, res) => {
  try {
      const { id } = req.params;
      const findMenu = await Menu.findOne({ _id: id })
      return res.status(200).json(findMenu)

  } catch (error) {
      console.log(error)
      return res.status(500).json(error)
  }
}

//4º endpoint CRUD (Update) --> modifico el año de un menú (id: 66321438b5d0e83cab2a0f68)
//Prueba postman ruta menu/update: OK

const updateMenu = async (req, res) => {
  try {
    const idMenu = req.params.id;
    const idFood = req.body.id;
    console.log(idMenu, idFood);
    const modifyMenu = await Menu.findByIdAndUpdate(
      idMenu,
      //RELACION CON EL MODELO FOOD
      { $push: { food: idFood } },//Se hace un push para agregar la comida que ya tenemos cargada y que puede compartir con otros menús
      { new: true }
    );
    return res.status(200).json(modifyMenu);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

//5º endpoint CRUD (Delete) --> elimino un menú ( id: 66321408b5d0e83cab2a0f62)
//Prueba Postman ruta menu/delete/:id : OK
const deleteMenu = async (req, res) => {
  try {
      const id = req.params.id;
      const deleteMenu = await Menu.findByIdAndDelete(id);
      if (!deleteMenu) {
          return res.status(404).json({ message: "This menu does not exist" })
      }
      return res.status(200).json(deleteMenu)
  } catch (error) {
      console.log(error)
      return res.status(500).json(error)
  }

}

module.exports = {addMenu, selectMenu, selectOneMenu, updateMenu, deleteMenu};