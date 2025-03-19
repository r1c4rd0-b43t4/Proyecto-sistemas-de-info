
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyBBm0kSFCKDxF17bfuRQq22oad72s1aUlg",
  authDomain: "pagweb---unimetrail.firebaseapp.com",
  projectId: "pagweb---unimetrail",
  storageBucket: "pagweb---unimetrail.firebasestorage.app",
  messagingSenderId: "435897747953",
  appId: "1:435897747953:web:99cc72006fddce47cddc50",
  measurementId: "G-SQNETNSRBF"
};


export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);