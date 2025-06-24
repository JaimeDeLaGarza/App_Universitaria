import React, { useEffect, useState } from 'react';// Importa React y hooks useEffect y useState para manejar el ciclo de vida y el estado del componente
import { NavigationContainer } from '@react-navigation/native';// Importa NavigationContainer para manejar la navegación en la aplicación
import { createNativeStackNavigator } from '@react-navigation/native-stack';// Importa createNativeStackNavigator para crear una pila de navegación nativa
import { View, Text, ActivityIndicator } from 'react-native';// Importa componentes de React Native para crear la interfaz de usuario
import Login from './login.js';// Importa el componente de inicio de sesión
import Pantalla1 from './Pantalla1.js';

function SplashScreen() {// Pantalla de carga inicial
  return (// Muestra una pantalla de carga mientras se cargan los recursos
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large"/>
      <Text>Cargando...</Text>
      <Text>Bienvenido a UDM</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();// Crea una pila de navegación nativa

export default function App() {// Componente principal de la aplicación
  const [isLoading, setIsLoading] = useState(true);// Estado para manejar la carga de recursos

  useEffect(() => {// Efecto para simular la carga de recursos al iniciar la aplicación
    // Simula carga de recursos
    setTimeout(() => setIsLoading(false), 2000);// Cambia el estado de isLoading a false después de 2 segundos
  }, []);// Efecto que se ejecuta una vez al montar el componente

  return (// Renderiza la navegación de la aplicación
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoading ? (// Si isLoading es true, muestra la pantalla de carga
          <Stack.Screen name="Splash" component={SplashScreen} />// Si isLoading es true, muestra la pantalla de carga
        ) : (
         <>
    <Stack.Screen name="Pantalla1" component={Pantalla1} />
    <Stack.Screen name="Login" component={Login} />
  </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}