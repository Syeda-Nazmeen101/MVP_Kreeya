import React, { useEffect, useState } from "react";
import { initGapi } from "./utils/calendar";
import { signInWithGoogle } from "./utils/auth";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [gapiReady, setGapiReady] = useState(false);
  const [user, setUser]   = useState(null);
  const [token, setToken] = useState("");

  /* 1️⃣  Load the Calendar API once and wait for it */
  useEffect(() => {
    (async () => {
      try {
        await initGapi();       // wait here ⬅️
        setGapiReady(true);     // now gapi.client.calendar exists
      } catch (e) {
        console.error("GAPI init failed", e);
      }
    })();
  }, []);

  /* 2️⃣  Handle Google sign-in */
 const handleLogin = async () => {
  try {
    const { user, token } = await signInWithGoogle();
    console.log("✅ User:", user);
    console.log("✅ Token:", token);

    setUser(user);
    setToken(token);
  } catch (e) {
    console.error("❌ Login failed:", e);
  }
};


  /* 3️⃣  Render */
  return (
    <main style={{ fontFamily: "sans-serif", padding: 24 }}>
      <h1>Kreeya MVP App</h1>

      {!user ? (
        <button onClick={handleLogin}>Sign in with Google</button>
      ) : !gapiReady ? (
        <p>Loading Google Calendar API…</p>
      ) : (
        <>
          <p>Welcome, {user.displayName}</p>
          {/* Dashboard only mounts after gapiReady === true */}
          <Dashboard token={token} />
        </>
      )}
    </main>
  );
}
