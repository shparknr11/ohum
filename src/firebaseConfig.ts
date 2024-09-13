import firebase from 'firebase/compat/app';
// 인증
import 'firebase/compat/auth';
// DB
import 'firebase/compat/firestore';
// 파일공간
import 'firebase/compat/storage';
// FirebaseConfig 타입 정의
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}
const firebaseConfig: FirebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_ATH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
// 기본 Key 세팅
firebase.initializeApp(firebaseConfig);
const auth: firebase.auth.Auth = firebase.auth();
const db: firebase.firestore.Firestore = firebase.firestore();
const storage: firebase.storage.Storage = firebase.storage();
export { auth, db, storage };
