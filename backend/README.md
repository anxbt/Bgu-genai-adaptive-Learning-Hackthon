# AI-Powered Adaptive Tutoring Backend

Production-grade Node.js backend for confusion-aware tutoring using Google Gemini.

## 🎯 Overview

This backend implements **confusion-aware tutoring**: diagnosing student mistakes, generating targeted explanations, and validating learning through retry attempts—NOT a generic chatbot.

## 🏗️ Architecture

```
bgu/
└── backend/
    ├── index.js                      # Express server
    ├── routes/
    │   └── tutor.routes.js          # API endpoints
    ├── services/
    │   ├── gemini.service.js        # Gemini API wrapper
    │   ├── diagnosis.service.js     # Misunderstanding classifier
    │   └── question.service.js      # Retry question generator
    ├── prompts/
    │   ├── explanation.prompt.js    # Teaching explanation prompts
    │   ├── retry.prompt.js          # Retry question prompts
    │   └── diagnosis.prompt.js      # Diagnosis prompts
    ├── utils/
    │   └── responseFormatter.js     # Consistent API responses
    ├── .env                         # Environment variables
    ├── package.json                 # Dependencies
    └── TEST_EXAMPLES.js             # Test examples
```

## 🚀 Quick Start

### 1. Navigate to Backend Directory

```bash
cd backend
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment

Create `.env` file:

```env
GEMINI_API_KEY=your_actual_api_key_here
PORT=3000
```

### 4. Start Server

```bash
pnpm start
```

Server will be available at `http://localhost:3000`

## 📡 API Endpoints

### Health Check

```bash
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-01-09T03:44:36.000Z",
  "service": "AI Adaptive Tutoring Backend",
  "version": "1.0.0"
}
```

---

### 1. Submit Student Attempt

```bash
POST /api/attempt
```

**Purpose:** Accept student's attempt and generate targeted explanation.

**Request Body:**
```json
{
  "subject": "web-development",
  "topic": "cors",
  "question": "Why does the browser block cross-origin requests?",
  "studentAnswer": "Because the server does not allow it",
  "expectedConcept": "CORS is enforced by the browser, not the server"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "diagnosis": "conceptual",
    "explanation": {
      "coreIdea": "CORS is a browser security feature, not a server restriction",
      "analogy": "Think of it like a security guard at your building checking visitors",
      "keyMistake": "You attributed the blocking to the server when it's the browser",
      "takeaway": "The browser enforces CORS to protect users from malicious sites"
    },
    "retryQuestion": {
      "question": "Which component in the web architecture enforces CORS policies?",
      "hint": "Think about where the security check happens before data reaches your code"
    }
  }
}
```

**Backend Flow:**
1. ✅ Validate required fields
2. 🧠 Diagnose misunderstanding type (`conceptual`, `procedural`, `partial`)
3. 🤖 Generate structured explanation via Gemini
4. ❓ Generate retry question
5. 📦 Return formatted response

---

### 2. Evaluate Retry Attempt

```bash
POST /api/retry
```

**Purpose:** Evaluate retry attempt and determine improvement.

**Request Body:**
```json
{
  "originalMistake": "conceptual",
  "retryAnswer": "Because browsers enforce security policies like CORS",
  "expectedConcept": "CORS is enforced by the browser"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "improved": true,
    "feedback": "You fixed the core misunderstanding about browser vs server responsibility",
    "nextDifficulty": "slightly-harder"
  }
}
```

**Backend Flow:**
1. ✅ Validate required fields and diagnosis type
2. 🤖 Evaluate improvement via Gemini
3. 📊 Determine next difficulty level
4. 📦 Return evaluation results

---

## 🧠 Pedagogical Design

### Diagnosis Types

| Type | Description | Teaching Approach |
|------|-------------|-------------------|
| **conceptual** | Fundamental misunderstanding | Use analogies, explain WHY |
| **procedural** | Knows concept but not application | Step-by-step HOW guidance |
| **partial** | Partially correct | Acknowledge correct parts, fill gaps |

### Gemini Usage Constraints

✅ **Allowed:**
- System-style pedagogical prompts
- Strict JSON output formats
- Teaching-focused role constraints

❌ **Forbidden:**
- Open-ended chat prompts
- Asking Gemini to "answer questions"
- Letting Gemini decide structure

---

## 🧪 Testing with cURL

### Test /api/attempt

```bash
curl -X POST http://localhost:3000/api/attempt \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "web-development",
    "topic": "cors",
    "question": "Why does the browser block cross-origin requests?",
    "studentAnswer": "Because the server does not allow it",
    "expectedConcept": "CORS is enforced by the browser, not the server"
  }'
```

### Test /api/retry

```bash
curl -X POST http://localhost:3000/api/retry \
  -H "Content-Type: application/json" \
  -d '{
    "originalMistake": "conceptual",
    "retryAnswer": "The browser enforces CORS to protect users",
    "expectedConcept": "CORS is enforced by the browser"
  }'
```

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| `express` | Web framework |
| `dotenv` | Environment variables |
| `@google/generative-ai` | Gemini SDK |
| `cors` | Cross-origin requests |

---

## 🔒 What This Backend Does NOT Include

- ❌ Authentication / Authorization
- ❌ Firebase integration
- ❌ Database (uses in-memory objects only)
- ❌ Frontend code
- ❌ Free-form chat endpoint
- ❌ Raw Gemini API exposure

---

## 🏗️ Production Considerations

For production deployment, consider adding:

1. **Rate limiting** - Protect against API abuse
2. **Input validation** - Stronger schema validation (e.g., Joi, Zod)
3. **Logging** - Structured logging (Winston, Pino)
4. **Monitoring** - Error tracking (Sentry)
5. **Caching** - Cache common diagnoses/explanations
6. **Database** - Persist student sessions and progress

---

## 📝 License

ISC

---

Built with ❤️ for adaptive learning
