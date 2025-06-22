const express = require('express');// Importa express
// Importa las dependencias necesarias

const sql = require('mssql');// Importa mssql con el driver mssql
const cors = require('cors');// Importa cors para manejar las solicitudes CORS

const app = express();// Crea una instancia de express
// Configuracion la aplicación express
app.use(cors());// Habilita CORS para permitir solicitudes desde otros dominios
app.use(express.json());// Habilita el análisis de JSON en las solicitudes entrantes

const dbConfig = {// Configuración de la base de datos
  user: 'UDM',// Nombre del usuario
  password: '1234',// Contrasena del usuario
  server: 'localhost',// Nombre del servidor de la base de datos o sino localhoust
  database: 'miLogin',// Nombre de la base de datos
  port: 1433,
  options: {// Opciones de conexión
    encrypt: false,               // No encripta en entorno local
    trustServerCertificate: true // Evita error por certificados
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

    console.log('Solicitud recibida con número:', Numero); //crea un mensaje para saber si el servidor funciona

    const result = await pool.request()// Crea una solicitud para la base de datos
      .input('Numero', sql.VarChar, Numero)// Agrega un parámetro de entrada llamado 'Numero' con el tipo sql.VarChar y el valor del número de control recibido
      .query('SELECT * FROM [Numero de Control] WHERE Numero = @Numero');// Realiza una consulta SQL para seleccionar todos los registros de la tabla 'Numero de Control' donde el campo 'Numero' coincida con el número de control proporcionado

    if (result.recordset.length > 0) {// Verifica si se encontraron registros en la consulta
      return res.status(200).json({
        message: 'Login exitoso',// Muestra un mensaje "login exitoso"
        user: result.recordset[0]// Devuelve el primer registro encontrado en la consulta como el usuario autenticado
      });// Termina la respuesta con un estado 200 (OK) y el usuario encontrado
    } else {// Si no se encontraron registros, devuelve un mensaje de error
      return res.status(401).json({// Devuelve un estado 401 (Unauthorized) si no se encuentra el número de control
        message: 'Número de control no encontrado'// Muestra un mensaje indicando que el número de control no se encontró
      });// Termina la respuesta con un mensaje de error
    }
  } catch (error) {// Si ocurre un error al conectarse a la base de datos o realizar la consulta
    console.error('Error en la consulta:', error);// Imprime el error en la consola para depuración
    return res.status(500).json({// Devuelve un estado 500 (Internal Server Error) si ocurre un error
      error: 'Error al conectar con la base de datos'// Muestra un mensaje de error indicando que hubo un problema al conectar con la base de datos
    });// Termina la respuesta con un mensaje de error
  }// Termina el bloque try-catch
});// Termina la ruta para manejar el inicio de sesión

app.listen(3000,'0.0.0.0', () => console.log('✅ API corriendo en http://192.168.2.131'));// Inicia el servidor en el puerto 3000 y escucha en todas las interfaces de red