import React, { useState } from 'react';// Importa React y useState para manejar el estado del componente
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';// Importa componentes de React Native para crear la interfaz de usuario

export default function Login() {// Componente de inicio de sesión
  const [numero_control, setNumeroControl] = useState('');// Crea un estado para almacenar el número de control ingresado por el usuario

  const handleLogin = () => {// Función que maneja el inicio de sesión al presionar el botón
    if (!numero_control.trim()) {// Verifica si el campo de número de control está vacío
      alert("Por favor, ingresa tu número de control");// Si está vacío, muestra una alerta al usuario
      return;// Termina la función si el campo está vacío
    }// Si el campo no está vacío, continúa con la solicitud de inicio de sesión

    fetch('http://192.168.2.131:3000/login', {// Realiza una solicitud POST a la API de inicio de sesión
      method: 'POST',// Define el método de la solicitud como POST
      headers: { 'Content-Type': 'application/json' },// Establece el encabezado Content-Type para indicar que se envían datos JSON
      body: JSON.stringify({ Numero: numero_control })// Convierte el número de control a una cadena JSON para enviarlo en el cuerpo de la solicitud
    })// Envía la solicitud a la API
      .then(res => res.json())// Convierte la respuesta de la API a formato JSON
      .then(data => {// Maneja la respuesta de la API
        if (data.user) {// Verifica si la respuesta contiene un usuario
          alert('Login exitoso');// Si se encuentra un usuario, muestra un mensaje de éxito
        } else {// Si no se encuentra un usuario, muestra un mensaje de error
          alert(data.message || 'Error en login');// Muestra el mensaje de error recibido de la API o un mensaje predeterminado
        }// Termina el manejo de la respuesta exitosa
      })// Maneja la respuesta de la API
      .catch(() => alert('Error de conexión'));// Maneja cualquier error que ocurra durante la solicitud, mostrando un mensaje de error de conexión
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenido a la App UDM</Text>
      <TextInput
        placeholder="Numero de Control"
        value={numero_control}
        onChangeText={setNumeroControl}// Actualiza el estado numero_control al cambiar el texto
        style={styles.input}// Crea un campo de entrada de texto para el número de control
      />
      <Button title="Ingresar" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({// Crea un objeto de estilos para aplicar a los componentes
  container: {// Define los estilos para la vista contenedora
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {// Define los estilos para el texto de bienvenida
    color: '#fff',
    fontSize: 20,
    marginBottom: 10,
  },
  input: {// Define los estilos para el campo de entrada de texto
    backgroundColor: '#fff',
    width: 250,
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});// Termina el objeto de estilos