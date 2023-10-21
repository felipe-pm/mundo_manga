const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();

const { registrarUsuario, obtenerDatosDeUsuario, verificarCredenciales, agregarProducto, updateUsuario, getProductos, getSelectedProduct } = require('../consultas/consultas');
const { checkCredentialsExist, tokenVerification } = require('../middlewares/middleware');

router.use(express.json());

router.get('/', (req, res) => {
    res.send('Hello World!');
})

router.post('/usuarios', checkCredentialsExist, async (req, res) => {
    try {
        const usuario = req.body;
        await registrarUsuario(usuario);
        res.send('Usuario registrado');
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get("/usuarios", tokenVerification, async (req, res) => {
    try {
        const token = req.header("Authorization").split("Bearer ")[1];
        const { email } = jwt.decode(token);
        const usuario = await obtenerDatosDeUsuario(email);
        res.json(usuario);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        await verificarCredenciales(email, password);
        const token = jwt.sign({ email }, process.env.SECRET);
        res.send(token);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post("/vender", async (req, res) => {
    const productoData = req.body;
    await agregarProducto(productoData);
    res.json({ message: 'Producto añadido con éxito', redirectTo: '/productos' });
})

router.patch("/update/:userID", async (req, res) => {
    try {
        const { userID } = req.params;
        const userData = req.body;
        if(userID != userData.id) {
            return res.status(400).send({
                message: "El ID del usuario no coincide con el ID del usuario actual"
            })
        }
        await updateUsuario(userData);
        res.send('Usuario actualizado con éxito');
        } catch (error) {
        res.status(error.code || 500).send(error.message);
    }
});

router.get("/productos", async (req, res) => {
    try {
        const productos = await getProductos();
        res.send(productos);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get("/productos/:producto_id", async (req, res) => {
    try {
      const { producto_id } = req.params;
      const data = await getSelectedProduct(producto_id);
      res.send(data);
    } catch (error) {
      res.status(error.code || 500).send(error.message);
    }
  });

module.exports = router