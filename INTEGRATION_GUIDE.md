# Full Stack Integration Guide

## 🎯 What Was Built

**Backend** (Node.js + Express + Gemini)
- API endpoints: `/api/attempt`, `/api/retry`, `/api/topics`
- Pedagogical prompt system with template variables
- Mock data for 4 topics (CORS, HTTP, DNS, TCP)

**Frontend** (React + TypeScript + shadcn/ui)
- Topics selection page
- Question answering interface
- Results page with diagnosis + explanation
- Retry evaluation flow

## 🚀 How to Run

### Terminal 1: Start Backend

```bash
cd backend
pnpm start
```

Backend will run on `http://localhost:3000`

### Terminal 2: Start Frontend

```bash
cd frontend
npm run dev
```

Frontend will run on `http://localhost:5173` (or similar Vite port)

## 🔄 Full User Flow

1. **Select Topic** → Choose from 4 topics (CORS, HTTP Lifecycle, DNS, TCP Handshake)
2. **Answer Question** → Type answer in own words
3. **Get Feedback** → AI diagnoses misunderstanding type and provides:
   - Core idea explanation
   - Analysis of mistake
   - Relatable analogy
   - Key takeaway
4. **Retry Question** → Answer follow-up question
5. **Evaluation** → Get feedback on improvement

## 🧪 Test the Integration

1. Start both servers
2. Open `http://localhost:5173`
3. Click on "CORS" topic
4. Enter a wrong answer (e.g., "Because the server blocks it")
5. Submit and observe:
   - Diagnosis: "conceptual"
   - Explanation explaining browser vs server
   - Retry question asking about the concept differently
6. Answer retry correctly
7. See improvement feedback

## 📁 File Structure

```
bgu/
├── backend/
│   ├── index.js          # Express server
│   ├── routes/           # API endpoints
│   ├── services/         # Gemini, diagnosis, question services
│   ├── prompts/          # Pedagogical prompts
│   ├── data/            # Mock questions
│   └── .env             # API key configured ✅
│
└── frontend/
    └── src/
        ├── api/         # tutorAPI.ts - API client
        ├── pages/       # TopicsPage, QuestionPage, ResultsPage
        └── App.tsx      # Router setup
```

## ✅ Integration Checklist

- [x] Backend API key configured
- [x] API service layer created
- [x] Topics page with 4 topics
- [x] Question submission flow
- [x] Results page with diagnosis
- [x] Retry evaluation
- [x] Error handling
- [x] Loading states
- [x] Toast notifications
