// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBm0kSFCKDxF17bfuRQq22oad72s1aUlg",
  authDomain: "pagweb---unimetrail.firebaseapp.com",
  projectId: "pagweb---unimetrail",
  storageBucket: "pagweb---unimetrail.firebasestorage.app",
  messagingSenderId: "435897747953",
  appId: "1:435897747953:web:99cc72006fddce47cddc50",
  measurementId: "G-SQNETNSRBF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);