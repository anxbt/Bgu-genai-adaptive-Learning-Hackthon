# AI-Powered Adaptive Tutoring System

This repository contains a production-grade backend for confusion-aware tutoring using Google Gemini.

## Quick Start

```bash
cd backend
pnpm install
```

Add your Gemini API key to `backend/.env`:
```env
GEMINI_API_KEY=your_api_key_here
PORT=3000
```

Start the server:
```bash
pnpm start
```

## Documentation

See [`backend/README.md`](./backend/README.md) for complete documentation.

## Project Structure

```
bgu/
└── backend/          # Complete Node.js backend
    ├── index.js      # Express server
    ├── routes/       # API endpoints
    ├── services/     # Core business logic
    ├── prompts/      # Gemini prompt templates
    └── utils/        # Utilities
```

## Features

- 🧠 Diagnoses student misunderstandings (conceptual, procedural, partial)
- 📚 Generates structured pedagogical explanations
- ❓ Creates retry questions to validate learning
- 🤖 Uses Google Gemini with strict teaching constraints
- 🚫 NOT a generic chatbot—focused on adaptive tutoring
