import React, { useEffect, useState } from 'react';// Importa React, useEffect y useState para manejar el ciclo de vida y el estado del componente
import { View, Text, Button, StyleSheet } from 'react-native';// Importa los componentes necesarios de React Native
import AsyncStorage from '@react-native-async-storage/async-storage';// Importa AsyncStorage para manejar el almacenamiento local
import { useNavigation } from '@react-navigation/native';// Importa useNavigation para manejar la navegación entre pantallas

export default function Pantalla1() {// Componente de la primera pantalla después del inicio de sesión
  const navigation = useNavigation();// Hook para acceder a la navegación de la aplicación
  const [numeroControl, setNumeroControl] = useState('');// Estado para almacenar el número de control del usuario

  const cargarNumeroControl = async () => {// Función para cargar el número de control desde AsyncStorage
    try {// Verifica si AsyncStorage está disponible
      const numero = await AsyncStorage.getItem('numeroControl');// Intenta obtener el número de control almacenado
      if (numero) {// Si se encuentra un número de control
        setNumeroControl(numero);// Actualiza el estado con el número de control obtenido
      }
    } catch (e) {// Maneja cualquier error que ocurra al intentar obtener el número de control
      console.error('Error al cargar número de control:', e);// Muestra un mensaje de error en la consola
    }
  };

  useEffect(() => {// Efecto para cargar el número de control al montar el componente
    cargarNumeroControl();// Llama a la función para cargar el número de control
  }, []);// Dependencias vacías para que se ejecute solo una vez al montar el componente

  const handleLogout = async () => {// Función para manejar el cierre de sesión
    try {// Intenta eliminar los datos de usuario almacenados en AsyncStorage
      await AsyncStorage.multiRemove(['usuarioLogueado', 'numeroControl']);// Elimina el estado de usuario logueado y el número de control
      navigation.replace('Login');// Redirige al usuario a la pantalla de inicio de sesión y elimina la pantalla actual del stack de navegación
    } catch (e) {// Maneja cualquier error que ocurra al intentar cerrar sesión
      console.error('Error al cerrar sesión:', e);// Muestra un mensaje de error en la consola
    }
  };

  return (// Renderiza la interfaz de usuario del componente de la primera pantalla
    <View style={styles.container}>
      <Text style={styles.title}>🏫 Bienvenido a la Facultad de Sistemas</Text>
      <Text style={styles.subtitle}>Tu número de control: {numeroControl}</Text>
      <Button title="Cerrar sesión" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({// Crea un objeto de estilos para aplicar a los componentes

  container: {// Define los estilos para el contenedor principal
    flex: 1,// Utiliza todo el espacio disponible
    backgroundColor: '#121212',// Establece el color de fondo del contenedor
    alignItems: 'center',// Alinea los elementos hijos al centro horizontalmente
    justifyContent: 'center',// Alinea los elementos hijos al centro verticalmente
    padding: 20// Añade un relleno de 20 unidades alrededor del contenedor
  },
  title: {// Define los estilos para el título
    color: '#fff',// Establece el color del texto del título
    fontSize: 22,// Establece el tamaño de fuente del título
    marginBottom: 10,// Añade un margen inferior de 10 unidades
    textAlign: 'center'// Alinea el texto del título al centro
  },
  subtitle: {// Define los estilos para el subtítulo
    color: '#ccc',// Establece el color del texto del subtítulo
    fontSize: 16,// Establece el tamaño de fuente del subtítulo
    marginBottom: 20,// Añade un margen inferior de 20 unidades
    textAlign: 'center'// Alinea el texto del subtítulo al centro
  }
});
