import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCYlnxe46bTbCDPcGqDfo9nMPAbAjmGaZ4",
  authDomain: "mvpproject-74a20.firebaseapp.com",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ⬅️ This is very important: add scope
provider.addScope("https://www.googleapis.com/auth/calendar.readonly");

export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);
  const credential = GoogleAuthProvider.credentialFromResult(result);

  // Defensive check
  if (!credential || !credential.accessToken) {
    throw new Error("No access token received from Firebase");
  }

  return { user: result.user, token: credential.accessToken };
};
