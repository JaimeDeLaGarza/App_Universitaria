import { registerRootComponent } from 'expo';

import App from './panInicio'; // Importa el componente principal de la aplicación desde panInicio.js
export default App; // Exporta el componente App como el componente principal de la aplicación

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);// Registra el componente App como el componente raíz de la aplicación Expo