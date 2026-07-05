# Persona Chat — Chaicode

A sleek, responsive Next.js chat application built for **Chaicode** that allows users to have simulated conversations with well-known tech educators **Piyush Garg** and **Hitesh Choudhary**. The application dynamically detects the user's input language, honors strict structural rules matching each educator's real-life vibe, and maintains a respectful tone at all times.

Live Website: **[https://vercel.com/anujjain33/persona-chat]**

---

## 🚀 Features

* **Multi-Persona Interaction**: Easily switch between chatting with Piyush Garg or Hitesh Choudhary directly from a beautiful selection dashboard.
* **Dynamic Language Matching**: Ask a question in English, Hindi (Devanagari script), or Hinglish (Hindi written in the English alphabet)—the backend automatically detects and responds in the exact same language format.
* **Enforced Respectful Tone**: Built-in system prompt constraints strictly eliminate informal pronouns like `tu` or `tum`, ensuring the AI exclusively addresses you as `Aap`.
* **Keyboard Send Support**: Send your messages instantly by hitting the `Enter` key right inside the chat input.
* **Clean Edge-to-Edge Layout**: Full viewport, edge-to-edge light sky blue styling that eliminates default browser spacing for an immersive feel.

---

## 🛠️ Tech Stack

* **Frontend**: Next.js (React), Inline JSX styling, and global CSS layout configurations.
* **Backend**: Next.js Serverless API Route handling payload resolution and prompt architecture.
* **AI Engine**: OpenAI API (`gpt-4o-mini`) using optimized temperature controls for strict alignment.
* **Deployment**: Integrated via GitHub into Vercel hosting.

---

## 📂 Project Structure

```text
├── data/
│   └── personas.json       # Holds system prompts, names, and custom persona rules
├── pages/
│   ├── api/
│   │   ├── chat.js         # Core backend API routing OpenAI completions
│   │   └── personas.js     # Endpoint serving raw persona definitions
│   ├── _app.js             # Application root layout injecting global styles
│   ├── frontend_flow.js    # The dedicated scrollable Persona Chat dashboard
│   └── index.js            # Home selection portal featuring mentor cards
├── public/
│   └── images/             # Static profile images for individual cards
└── styles/
    └── globals.css         # Global resets clearing viewport borders/margins


## Local Setup Instructions
Follow these quick steps to pull down the repository and run this project locally on your machine:

1. Clone the repository
Bash
git clone [https://github.com/lovenayak19/persona-chat.git](https://github.com/lovenayak19/persona-chat.git)
cd persona-chat
2. Install dependencies
Bash
npm install
3. Setup Environment Credentials
Create a .env file at the root level of the folder and add your secret OpenAI key:

Code snippet
OPENAI_API_KEY=your_secret_openai_api_key_here
(Note: Your .env file is safely tracked inside .gitignore and will never be leaked to public source control).

## Boot the development ecosystem
Bash
npm run dev
Open your browser and navigate to http://localhost:3000 to interact with your local setup.

👤 Author
Anuj Nayak - Full Stack Implementation & UI/UX Refinement.
Project designed for Chaicode Demo.