// pb.js
import PocketBase from 'https://cdn.jsdelivr.net/npm/pocketbase@latest/dist/pocketbase.es.js';

// URL de tu servidor de PocketBase (ajústala si estás en local o desplegado)
export const pb = new PocketBase('http://127.0.0.1:8090');

// Exportamos una única instancia (Singleton)
//export default pb;