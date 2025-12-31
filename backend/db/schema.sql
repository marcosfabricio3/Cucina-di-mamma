CREATE DATABASE IF NOT EXISTS  cucina_di_mamma
DEFAULT CHARACTER SET utf8mb4
DEFAULT COLLATE utf8mb4_0900_ai_ci;

USE cucina_di_mamma;

DROP TABLE IF EXISTS consultas;

CREATE TABLE IF NOT EXISTS consultas (
id INT UNSIGNED NOT NULL AUTO_INCREMENT,
nombre VARCHAR(50) NOT NULL,
email VARCHAR(100) NOT NULL,
asunto VARCHAR(100),
mensaje TEXT NOT NULL,
fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (id),
INDEX idx_consultas_fecha (fecha),
INDEX idx_consultas_email (email),
CONSTRAINT restriccion_nombre_length CHECK (CHAR_LENGTH(nombre) >= 3),
CONSTRAINT restriccion_length CHECK (CHAR_LENGTH(mensaje) >= 10)
);

SELECT * FROM consultas;
