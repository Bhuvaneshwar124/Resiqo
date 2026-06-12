import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAzLx1fnMwO719iIzzvyM-rZ-zEuQLrJE0",
  authDomain: "resiqo-6aee4.firebaseapp.com",
  projectId: "resiqo-6aee4",
  storageBucket: "resiqo-6aee4.firebasestorage.app",
  messagingSenderId: "913678864617",
  appId: "1:913678864617:web:74adfafa4c665335842078",
  measurementId: "G-9TXTMV45BH"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
