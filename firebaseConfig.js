import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: 'AIzaSyAiIzpBclopeE3eMex5H1uV_g43dmigXu0',
  authDomain: 'auth-firebase-54d67.firebaseapp.com',
  projectId: 'auth-firebase-54d67',
  storageBucket: 'auth-firebase-54d67.appspot.com',
  messagingSenderId: '914529374166',
  appId: '1:914529374166:web:840c805d20e17c867bde77',
  measurementId: 'G-C97LZCE8Y5',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};
