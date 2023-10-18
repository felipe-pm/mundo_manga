CREATE DATABASE tienda_anime;


--TABLA DE USUARIOS--
CREATE TABLE
	usuarios (
		usuario_id SERIAL PRIMARY KEY,
		nombre VARCHAR(50),
		apellido VARCHAR(50),
		direccion VARCHAR(150),
		email VARCHAR(100) UNIQUE,
		password VARCHAR(250)
	);
	
--TABLA DE PRODUCTOS--
CREATE TABLE
	productos (
		producto_id SERIAL PRIMARY KEY,
		titulo VARCHAR(100),
		editorial VARCHAR(100),
		descripcion VARCHAR(500),
		precio INT,
		imagen VARCHAR(500),
		usuario_id INT,
		CONSTRAINT fk_usuarioid FOREIGN KEY (usuario_id) REFERENCES usuarios (usuario_id) ON DELETE CASCADE
	);