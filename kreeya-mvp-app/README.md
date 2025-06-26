# Kreeya MVP App
This is a React-based MVP web app that:
- Authenticates users with **Firebase Google Sign-In**
- Fetches upcoming events from **Google Calendar**
- Summarizes events using **OpenAI GPT**
- Displays the summaries on a dashboard

---

## 🚀 Features

- 🔐 Google Sign-In via Firebase
- 📅 Google Calendar Integration (read-only)
- 🤖 Event summaries via OpenAI GPT API
- 🔧 Clean and modern React frontend

---

## 📁 Project Structure

.
├── public/
├── src/
│ ├── components/
│ │ └── Dashboard.jsx
│ ├── utils/
│ │ ├── auth.js
│ │ └── calendar.js
│ ├── App.jsx
│ └── main.jsx
├── .env
├── package.json
└── README.md

yaml


---

## ⚙️ Environment Setup

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/kreeya-mvp.git
cd kreeya-mvp
2. Install dependencies
bash

npm install
3. Create .env file
In the root directory, create a .env file:

env

# Firebase
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com

# Google
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id

# OpenAI
VITE_OPENAI_API_KEY=your_openai_api_key
4. Run the development server
bash

npm run dev
🔐 Authentication
Firebase is used for Google sign-in. Users are prompted to log in via Google, and their access token is used for Google Calendar API calls.

📅 Google Calendar Integration
After login, the app:

Initializes the Google API client (gapi)

Uses the user's access token to fetch their upcoming 10 calendar events

Events are fetched from the primary calendar using:

js

gapi.client.calendar.events.list({...})
🤖 OpenAI Event Summarization
Each fetched calendar event is passed to OpenAI with a prompt like:

vbnet

Summarize this event for a user-friendly dashboard: 
Title: Team Sync
Date: 2025-06-30
Time: 3:00 PM to 4:00 PM
Responses are displayed beneath the event list.

⚠️ Don't expose your OpenAI API key in client-side production apps — this MVP is for learning/demo purposes.

🛠️ Tech Stack
React + Vite

Firebase Auth

Google Calendar API

OpenAI GPT

TailwindCSS 



