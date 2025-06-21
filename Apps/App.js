import React, { useState } from 'react';//importa useState para manejar el estado de los componentes
import { StatusBar } from 'expo-status-bar';//importa StatusBar para manejar la barra de estado
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';//importa StyleSheet, Text, View, TextInput y Button para crear la interfaz de usuario

export default function App() {//exporta la función App como el componente principal de la aplicación

  // Define el estado para el número de control y una función para manejar el inicio de sesión
  const [numero_control, setNumeroControl] = useState('');//usa useState para crear una variable de estado llamada numero_control y una función para actualizarla
  // Inicializa numero_control como una cadena vacía, esto permite que el componente se re-renderice cuando numero_control cambie y se actualiza la interfaz de usuario

const handleLogin = () => {// Define la función handleLogin que se ejecuta al presionar el botón de inicio de sesión
  if (!numero_control.trim()) {// Verifica si el campo de número de control está vacío

    // Si está vacío, muestra una alerta y no hace nada más
    alert("Por favor, ingresa tu número de control");// Muestra la alerta al usuario
    return;// Termina la función si el campo está vacío

  }

  fetch('http://192.168.2.131:3000/login', {// Realiza una solicitud POST a la API de inicio de sesión
    // Reemplaza la URL con la dirección IP de tu servidor y el puerto correcto

    method: 'POST',// Metodo usado para la solicitud
    headers: { 'Content-Type': 'application/json' },// Establece el encabezado Content-Type para indicar que se envían datos JSON
    body: JSON.stringify({ Numero: numero_control })// Convierte el número de control a una cadena JSON para enviarlo en el cuerpo de la solicitud

  })
    .then(res => res.json())// Convierte la respuesta de la API a formato JSON
    .then(data => {// Maneja la respuesta de la API
      // Si la respuesta contiene un usuario, muestra un mensaje de bienvenida
      // Si no, muestra un mensaje de error

      if (data.user) {// Verifica si la respuesta contiene un usuario
        alert(`¡Bienvenido ${data.user.Nombre || numero_control}!`);// Muestra un mensaje de bienvenida al usuario, usando el nombre del usuario si está disponible, o el número de control si no lo está
      } else {// Si no se encuentra un usuario, muestra un mensaje de error
        alert("Número de control no encontrado");// Muestra el mensaje de error si el número de control no se encuentra en la base de datos
      }
      setNumeroControl('');// Limpia el campo de número de control después de iniciar sesión
    })// Maneja la respuesta de la API

    .catch(error => {// Maneja cualquier error que ocurra durante la solicitud
      // Si ocurre un error, muestra un mensaje de error y limpia el campo de número de control
      console.error("Error al conectar con la API:", error);// Imprime el error en la consola para depuración
      alert("Ocurrió un error al intentar conectar con el servidor");// Muestra un mensaje de error al usuario
      setNumeroControl('');// Limpia el campo de número de control en caso de error
    });// Maneja el error de la solicitud

};// Termina la función handleLogin

  return (// Renderiza la interfaz de usuario de la aplicación
    <View style={styles.container}>{/* Crea una vista contenedora con estilos definidos en el objeto styles */}
      <Text style={styles.text}>Bienvenido a la App UDM</Text>{/* Muestra un texto de bienvenida al usuario */}
      <TextInput placeholder="Numero de Control" value={numero_control} onChangeText={setNumeroControl} style={styles.input} />{/* Crea un campo de entrada de texto para el número de control,
      con un marcador de posición, valor vinculado al estado numero_control y una función para actualizarlo al cambiar el texto */}
      <Button title="Ingresar" onPress={handleLogin} />{/* Crea un botón con el título "Ingresar" que llama a la función handleLogin al presionarlo */}
      <StatusBar style="auto" />{/* Muestra la barra de estado con el estilo predeterminado */}
    </View>
  );// Termina el componente App
}

const styles = StyleSheet.create({// Crea un objeto de estilos para aplicar a los componentes
  container: {// Define los estilos para la vista contenedora
    flex: 1,// Usa flex para que la vista ocupe todo el espacio disponible
    backgroundColor: '#000',// Establece el color de fondo de la vista
    alignItems: 'center',// Alinea los elementos hijos al centro horizontalmente
    justifyContent: 'center',// Alinea los elementos hijos al centro verticalmente
  },// Termina el estilo de la vista contenedora

  text: {// Define los estilos para el texto de bienvenida
    color: '#fff',// Establece el color del texto a blanco
    fontSize: 20,// Establece el tamaño de fuente del texto
    marginBottom: 10,// Añade un margen inferior para separar el texto del campo de entrada
  },// Termina el estilo del texto de bienvenida

  input: {// Define los estilos para el campo de entrada de texto
    backgroundColor: '#fff',// Establece el color de fondo del campo de entrada a blanco
    width: 250,// Establece el ancho del campo de entrada
    height: 40,// Establece la altura del campo de entrada
    marginBottom: 10,// Añade un margen inferior para separar el campo de entrada del botón
    paddingHorizontal: 10,// Añade un relleno horizontal para que el texto no esté pegado a los bordes del campo de entrada
  },// Termina el estilo del campo de entrada de texto
  
});// Termina el objeto de estilos

