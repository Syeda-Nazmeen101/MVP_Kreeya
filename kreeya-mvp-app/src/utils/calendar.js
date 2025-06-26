import { gapi } from "gapi-script";

const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const API_KEY   = import.meta.env.VITE_FIREBASE_API_KEY;

/** Initialise gapi and load the Calendar API */
export const initGapi = () =>
  new Promise((resolve, reject) => {
    gapi.load("client:auth2:calendar", async () => {
      try {
        await gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          scope: SCOPES,
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
          ],
        });
        resolve();
      } catch (err) {
        console.error("GAPI init failed:", err);
        reject(err);
      }
    });
  });

/** Return the next 10 upcoming events */
export const listEvents = (token) =>
  new Promise((resolve, reject) => {
    if (!gapi.client?.calendar) {
      console.error("❌ gapi.client.calendar not loaded");
      return resolve([]);
    }

    gapi.client.setToken({ access_token: token });
    console.log("📌 listEvents(): token set:", token);   


    gapi.client.calendar.events
      .list({
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        showDeleted: false,
        orderBy: "startTime",
      })
      .then((r) => {
        console.log("📥 Events fetched:", r.result.items);            // ← ADD
        resolve(r.result.items ?? []);
      })
      .catch((e) => {
        console.error("❌ Calendar fetch failed", e);
        reject(e)
      });
  });
