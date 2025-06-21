const express = require('express');// Importa express
// Importa las dependencias necesarias

const sql = require('mssql/msnodesqlv8');// Importa mssql con el driver msnodesqlv8
const cors = require('cors');// Importa cors para manejar las solicitudes CORS

const app = express();// Crea una instancia de express
// Configura la aplicación express
app.use(cors());// Habilita CORS para permitir solicitudes desde otros dominios
app.use(express.json());// Habilita el análisis de JSON en las solicitudes entrantes

const dbConfig = {// Configuración de la base de datos
  server: 'DESKTOP-DD24R23\\SQLEXPRESS',// Nombre del servidor de la base de datos
  database: 'miLogin',// Nombre de la base de datos
  driver: 'msnodesqlv8',// Especifica el driver a usar
  options: {// Opciones de conexión
    trustedConnection: true // Usa una conexión confiable (sin autenticación de usuario y contraseña)
  }// Termina las opciones de conexión
};// Termina la configuración de la base de datos

app.post('/login', async (req, res) => {// Ruta para manejar el inicio de sesión
  // Maneja las solicitudes POST a la ruta /login

  const { Numero } = req.body;// Extrae el número de control del cuerpo de la solicitud
  // Verifica si el número de control está presente

  try {// Intenta conectarse a la base de datos y realizar la consulta
    const pool = await sql.connect(dbConfig);// Establece una conexión con la base de datos usando la configuración definida
    // Si la conexión es exitosa, crea un pool de conexiones
    // y permite realizar consultas a la base de datos

    const result = await pool.request()// Crea una solicitud para la base de datos
      .input('Numero', sql.VarChar, Numero)// Agrega un parámetro de entrada llamado 'Numero' con el tipo sql.VarChar y el valor del número de control recibido
      .query('SELECT * FROM [Numero de Control] WHERE Numero = @Numero');// Realiza una consulta SQL para seleccionar todos los registros de la tabla 'Numero de Control' donde el campo 'Numero' coincida con el número de control proporcionado

    if (result.recordset.length > 0) {// Verifica si se encontraron registros en la consulta
      return res.status(200).json({
        message: 'Login exitoso',// Muestra un mensaje "login exitoso"
        user: result.recordset[0]
      });
    } else {
      return res.status(401).json({
        message: 'Número de control no encontrado'
      });
    }
  } catch (error) {
    console.error('Error en la consulta:', error);
    return res.status(500).json({
      error: 'Error al conectar con la base de datos'
    });
  }
});

app.listen(3000,'0.0.0.0', () => console.log('✅ API corriendo en http://192.168.2.131'));