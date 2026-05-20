# AI LinkedIn Content Generator

An AI-powered web application that generates engaging LinkedIn posts using OpenAI's GPT-3.5. Simply enter a topic, choose a tone, and get a complete LinkedIn post with a hook, body, call-to-action, and hashtags.

---

## Features

- **AI-Powered Content**: Uses OpenAI GPT-3.5 to generate high-quality LinkedIn posts
- **Multiple Tones**: Choose between Professional, Casual, or Inspirational writing styles
- **Structured Output**: Get a complete post with hook, body, CTA, and hashtags
- **One-Click Copy**: Copy all generated content to your clipboard instantly
- **Modern UI**: Clean, responsive design with gradient backgrounds and card layouts
- **Error Handling**: Helpful error messages if something goes wrong

---

## Tech Stack

| Layer    | Technology                        |
|----------|-----------------------------------|
| Frontend | React 18, Tailwind CSS            |
| Backend  | Node.js, Express                  |
| AI       | OpenAI API (GPT-3.5-turbo)       |
| Styling  | Tailwind CSS, PostCSS             |

---

## Folder Structure

```
linkedin-content-generator/
├── client/                  # React frontend
│   ├── public/
│   │   └── index.html       # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   └── ContentGenerator.jsx  # Main component
│   │   ├── App.jsx          # Root component
│   │   ├── index.js         # Entry point
│   │   └── index.css        # Tailwind directives
│   ├── package.json         # Frontend dependencies
│   └── tailwind.config.js   # Tailwind configuration
├── server/                  # Node.js backend
│   ├── index.js             # Express server & API routes
│   ├── package.json         # Backend dependencies
│   └── .env.example         # Environment variables template
├── README.md                # This file
└── .gitignore               # Git ignore rules
```

---

## Prerequisites

Before you begin, make sure you have the following installed:

1. **Node.js** (version 16 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** (comes with Node.js)
   - Verify installation: `npm --version`

3. **OpenAI API Key**
   - You need an API key from OpenAI (see instructions below)

---

## How to Get an OpenAI API Key

1. Go to [OpenAI's website](https://platform.openai.com/)
2. Sign up for an account (or log in if you already have one)
3. Navigate to **API Keys** section in your dashboard
4. Click **Create new secret key**
5. Copy the key (you won't be able to see it again)
6. **Important**: You may need to add billing information and purchase credits

> **Note**: OpenAI charges per API call. GPT-3.5-turbo is very affordable (fractions of a cent per request). Check their [pricing page](https://openai.com/pricing) for current rates.

---

## Installation (Step by Step)

### Step 1: Clone or Download the Project

```bash
# If using git:
git clone <your-repo-url>
cd linkedin-content-generator

# Or simply navigate to the project folder
cd linkedin-content-generator
```

### Step 2: Set Up the Backend (Server)

```bash
# Navigate to the server folder
cd server

# Install dependencies
npm install

# Create your environment file by copying the example
# On Windows use: copy .env.example .env
# On Mac/Linux use: cp .env.example .env
cp .env.example .env

# Open .env and add your OpenAI API key
# Replace 'your_openai_api_key_here' with your actual key
```

Your `.env` file should look like:
```
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
PORT=5000
```

### Step 3: Set Up the Frontend (Client)

```bash
# Navigate to the client folder (from the project root)
cd client

# Install dependencies
npm install
```

---

## Running the Application

You need to run BOTH the backend and frontend simultaneously (in two separate terminals).

### Terminal 1: Start the Backend Server

```bash
cd server
npm run dev    # Uses nodemon for auto-restart on changes
# OR
npm start      # Standard start without auto-restart
```

You should see:
```
Server is running on http://localhost:5000
Health check: http://localhost:5000/api/health
```

### Terminal 2: Start the Frontend

```bash
cd client
npm start
```

This will open your browser automatically at `http://localhost:3000`.

---

## How to Use

1. Enter a topic in the text field (e.g., "The future of AI in healthcare")
2. Select a tone from the dropdown (Professional, Casual, or Inspirational)
3. Click **Generate Content**
4. Wait a few seconds for the AI to generate your post
5. Review the generated hook, post, CTA, and hashtags
6. Click **Copy to Clipboard** to copy everything
7. Paste it into LinkedIn

---

## Environment Variables

| Variable        | Description                    | Required |
|----------------|--------------------------------|----------|
| OPENAI_API_KEY | Your OpenAI API secret key     | Yes      |
| PORT           | Server port (default: 5000)    | No       |

---

## Troubleshooting

### "Failed to generate content"
- Make sure the backend server is running on port 5000
- Check that your OpenAI API key is valid in the `.env` file

### "Invalid OpenAI API key"
- Double-check your API key in the `.env` file
- Make sure there are no extra spaces or quotes around the key

### "OpenAI API quota exceeded"
- You may need to add billing information to your OpenAI account
- Check your usage at https://platform.openai.com/usage

### Frontend won't start
- Make sure you ran `npm install` in the client folder
- Try deleting `node_modules` and running `npm install` again

---

## Tips for Beginners

- **Start the backend first** - The frontend needs the backend to be running
- **Keep both terminals open** - You need both servers running simultaneously
- **Check the console** - Error messages in the browser console (F12) can help debug issues
- **API costs** - Each generation costs a tiny amount. GPT-3.5-turbo is very affordable
- **Customize the prompt** - Edit the prompt in `server/index.js` to change the output style
- **Tailwind classes** - Look up classes at https://tailwindcss.com/docs

---

## Screenshots

> Add your screenshots here after running the app

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Contributing

Feel free to fork this project and submit pull requests. Some ideas for improvements:
- Add more tone options
- Save generated posts to a history
- Add character count for LinkedIn's limits
- Support for multiple languages
- Dark mode toggle
