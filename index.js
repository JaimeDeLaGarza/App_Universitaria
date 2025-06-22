import { registerRootComponent } from 'expo';// registerRootComponen practicamente se encarga de que sea multiplataforma

import App from './App';// insica que arancara en la multipla 

// registerRootComponent llama a AppRegistry.registerComponent('main', () => App);
// También asegura que, ya sea que cargues la app en Expo Go o en una compilación nativa,
// el entorno esté configurado adecuadamente
registerRootComponent(App);