// src/environments/firebase-config.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { environment } from './environment'; // Ajusta esta ruta si es necesario

const app = initializeApp(environment.firebaseConfig);
export const db = getFirestore(app); // Exporta la instancia de Firestore
export const auth = getAuth(app); // Exporta la instancia de Auth
