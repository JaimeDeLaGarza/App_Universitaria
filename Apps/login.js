import React, { useState } from 'react';// Importa React y useState para manejar el estado del componente
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert 
} from 'react-native';// Importa los componentes necesarios de React Native
import AsyncStorage from '@react-native-async-storage/async-storage';// Importa AsyncStorage para manejar el almacenamiento local
import { useNavigation } from '@react-navigation/native';// Importa AsyncStorage para manejar el almacenamiento local y useNavigation para la navegación

export default function Login() {// Componente de inicio de sesión
  const [numero_control, setNumeroControl] = useState('');// Estado para almacenar el número de control ingresado por el usuario
  const navigation = useNavigation();// Hook para acceder a la navegación de la aplicación

  const handleLogin = () => {// Función que maneja el inicio de sesión
    if (!numero_control.trim()) {// Verifica si el campo de número de control está vacío
      alert('Por favor, ingresa tu número de control');// Muestra una alerta si el campo está vacío
      return;// Termina la función si el campo está vacío
    }

    fetch('http://192.168.2.131:3000/login', {// Realiza una solicitud POST a la API de inicio de sesión
      method: 'POST',// Método de la solicitud
      headers: { 'Content-Type': 'application/json' },// Establece el encabezado Content-Type para indicar que se envían datos JSON
      body: JSON.stringify({ Numero: numero_control })// Convierte el número de control a una cadena JSON para enviarlo en el cuerpo de la solicitud
    })
      .then(res => res.json())// Convierte la respuesta de la API a formato JSON
      .then(async data => {// Maneja la respuesta de la API
        if (data.user) {// Verifica si la respuesta contiene un usuario
          await AsyncStorage.setItem('usuarioLogueado', 'true');// Guarda el estado de usuario logueado en AsyncStorage
          await AsyncStorage.setItem('numeroControl', numero_control);// Guarda el número de control en AsyncStorage
          alert('Login exitoso');// Muestra un mensaje de éxito al usuario
          navigation.replace('Pantalla1'); // Redirige al pantalla1 y elimina el Login del stack
        } else {
          alert(data.message || 'Error en login');// Muestra un mensaje de error si no se encuentra un usuario
        }
      })
      .catch(() => alert('Error de conexión'));// Maneja cualquier error que ocurra durante la solicitud y muestra un mensaje de error
  };

  return (// Renderiza la interfaz de usuario del componente de inicio de sesión
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenido a la App UDM</Text>
      <TextInput
        placeholder="Número de Control"// Crea un campo de entrada de texto para el número de control
        value={numero_control}// Vincula el valor del campo de entrada al estado numero_control
        onChangeText={setNumeroControl}// Actualiza el estado numero_control al cambiar el texto
        style={styles.input}// Aplica estilos al campo de entrada
      />
      <Button title="Ingresar" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({// Crea un objeto de estilos para aplicar a los componentes
  container: {
    flex: 1,// Utiliza todo el espacio disponible
    backgroundColor: '#000',// Establece el color de fondo de la vista
    alignItems: 'center',// Alinea los elementos hijos al centro horizontalmente
    justifyContent: 'center'// Alinea los elementos hijos al centro verticalmente
  },
  text: {// Define los estilos para el texto de bienvenida
    color: '#fff',// Establece el color del texto a blanco
    fontSize: 20,// Establece el tamaño de fuente del texto
    marginBottom: 10// Añade un margen inferior para separar el texto del campo de entrada
  },
  input: {// Define los estilos para el campo de entrada de texto
    backgroundColor: '#fff',// Establece el color de fondo del campo de entrada a blanco
    width: 250,// Establece el ancho del campo de entrada
    height: 40,// Establece la altura del campo de entrada
    marginBottom: 10,// Añade un margen inferior para separar el campo de entrada del botón
    paddingHorizontal: 10// Añade un relleno horizontal para mejorar la apariencia del campo de entrada
  }
});
