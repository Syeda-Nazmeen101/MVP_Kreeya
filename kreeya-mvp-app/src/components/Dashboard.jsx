import React, { useEffect, useState } from "react";
import { listEvents } from "../utils/calendar";

const Dashboard = ({ token }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log("📌 Dashboard received token:", token);   // DEBUG
        setLoading(true);
        const items = await listEvents(token);
        console.log("📅 Events returned:", items);  
                  // DEBUG
                  console.log("✅ Events passed to Dashboard:", items); // ← ADD

        setEvents(items);
        setLoading(false);
      } catch (err) {
        console.error("❌ listEvents failed:", err);          // DEBUG
        setError("Failed to load events.");
        setLoading(false);
      }
    };

    if (token) fetchEvents();
  }, [token]);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Upcoming Google Calendar Events</h2>

      {loading && <p>Loading…</p>}
      {error   && <p style={{ color: "red" }}>{error}</p>}
      {!loading && events.length === 0 && <p>No upcoming events found.</p>}

      <ul>
        {events.map((ev) => (
          <li key={ev.id} style={{ marginBottom: "1rem" }}>
            <strong>{ev.summary}</strong><br/>
            {ev.start?.dateTime
              ? new Date(ev.start.dateTime).toLocaleString()
              : ev.start?.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
