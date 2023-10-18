const pool = require('../db/conexion');
const bcrypt = require('bcryptjs');

const registrarUsuario = async (usuario) => {
    let { nombre, apellido, direccion, email, password } = usuario;
    const passwordEncriptada = bcrypt.hashSync(password);
    password = passwordEncriptada;
    const values = [nombre, apellido, direccion, email, passwordEncriptada];
    const consultas = "INSERT INTO usuarios VALUES (DEFAULT, $1, $2, $3, $4, $5)";
    await pool.query(consultas, values);
}

const obtenerDatosDeUsuario = async (email) => {
    const values = [email];
    const consulta = "SELECT * FROM usuarios WHERE email = $1";

    const {
        rows: [usuario],
        rowCount,
    } = await pool.query(consulta, values);

    if (!rowCount) {
        throw {
            code: 404,
            message: "No se encontro ningún usuario con este email"
        };
    }

    delete usuario.password;
    return usuario;
};

const verificarCredenciales = async (email, password) => {
    const values = [email];
    const consulta = "SELECT * FROM usuarios WHERE email = $1";

    const {
        rows: [usuario],
        rowCount,
    } = await pool.query(consulta, values);

    const { password: passwordEncriptada } = usuario;
    const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada);

    if (!passwordEsCorrecta || !rowCount)
        throw {
            code: 401,
            message: "Email o contraseña incorrectas"
        };
};

const agregarProducto = async (productoData) => {
    try {
        const {
            titulo,
            editorial,
            descripcion,
            precio,
            imagen,
            usuario_id,
        } = productoData;
        const values = [
            titulo,
            editorial,
            descripcion,
            precio,
            imagen,
            usuario_id
        ];
        const consulta = "INSERT INTO productos (titulo, editorial, descripcion, precio, imagen, usuario_id) VALUES ($1, $2, $3, $4, $5, $6)";

        await pool.query(consulta, values);
    } catch (error) {
        console.log(error);
    }
};

const updateUsuario = async (userData) => {
    try {
        const {nombre, apellido, direccion, email, password} = userData;
        const passwordEncriptada = bcrypt.hashSync(password);
        const query = "UPDATE usuarios SET nombre = $1, apellido = $2, direccion = $3, email = $4, password = $5 WHERE usuario_id = $6";
        await pool.query(query, [nombre, apellido, direccion, email, passwordEncriptada, userData.id]);
    } catch (error) {
        console.log(error);
    }
};

const getProductos = async () => {
    const resultado = await pool.query("SELECT * FROM productos");
    console.log(resultado.rows);
    return resultado.rows;
  };

const getSelectedProduct = async (producto_id) => {
    const values = [producto_id];
    const consulta = "SELECT * FROM productos WHERE producto_id = $1";
    const { rows: rowCount } = await pool.query(consulta, values);
    if (!rowCount) throw { code: 404, message: "Producto no encontrado" };
    return rowCount[0];
  };


module.exports = {
    registrarUsuario,
    obtenerDatosDeUsuario,
    verificarCredenciales,
    agregarProducto,
    updateUsuario,
    getProductos,
    getSelectedProduct
}