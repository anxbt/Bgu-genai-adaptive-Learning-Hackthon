/**
 * Example Test File
 * Manual testing examples for the tutoring backend
 * 
 * Prerequisites:
 * 1. Navigate to backend folder: cd backend
 * 2. Add your Gemini API key to .env
 * 3. Start the server: pnpm start
 * 4. Run these tests in a separate terminal
 */

console.log('📚 AI Tutoring Backend - Test Examples\n');
console.log('Make sure the server is running on http://localhost:3000\n');
console.log('Copy and paste these curl commands to test:\n');
console.log('═══════════════════════════════════════════════════════\n');

// Test 1: Health Check
console.log('1️⃣  HEALTH CHECK');
console.log('─────────────────────────────────────────────────────');
console.log(`curl http://localhost:3000/health\n`);

// Test 2: Get Available Topics
console.log('2️⃣  GET AVAILABLE TOPICS');
console.log('─────────────────────────────────────────────────────');
console.log(`curl http://localhost:3000/api/topics\n`);

// Test 3: CORS - Conceptual Misunderstanding
console.log('3️⃣  WEB DEV: CORS (Conceptual Misunderstanding)');
console.log('─────────────────────────────────────────────────────');
console.log(`curl -X POST http://localhost:3000/api/attempt \\
  -H "Content-Type: application/json" \\
  -d '{
    "subject": "web-development",
    "topic": "cors",
    "question": "Why does a browser block cross-origin HTTP requests?",
    "studentAnswer": "Because the server does not allow cross-origin requests",
    "expectedConcept": "CORS is a browser-enforced security policy; the server only provides headers, but the browser decides whether to block or allow the request"
  }'\n`);

// Test 4: DNS Resolution
console.log('4️⃣  COMPUTER NETWORKS: DNS Resolution');
console.log('─────────────────────────────────────────────────────');
console.log(`curl -X POST http://localhost:3000/api/attempt \\
  -H "Content-Type: application/json" \\
  -d '{
    "subject": "computer-networks",
    "topic": "dns",
    "question": "What happens when you type a domain name into a browser?",
    "studentAnswer": "The browser directly connects to the website server",
    "expectedConcept": "The browser resolves the domain name to an IP address using DNS before initiating a network connection"
  }'\n`);

// Test 5: TCP Handshake
console.log('5️⃣  COMPUTER NETWORKS: TCP Three-Way Handshake');
console.log('─────────────────────────────────────────────────────');
console.log(`curl -X POST http://localhost:3000/api/attempt \\
  -H "Content-Type: application/json" \\
  -d '{
    "subject": "computer-networks",
    "topic": "tcp-handshake",
    "question": "Why does TCP use a three-way handshake before data transfer?",
    "studentAnswer": "To send data faster",
    "expectedConcept": "The handshake ensures both client and server are ready and agree on connection parameters before data transmission"
  }'\n`);

// Test 6: HTTP Lifecycle
console.log('6️⃣  WEB DEV: HTTP Request-Response Lifecycle');
console.log('─────────────────────────────────────────────────────');
console.log(`curl -X POST http://localhost:3000/api/attempt \\
  -H "Content-Type: application/json" \\
  -d '{
    "subject": "web-development",
    "topic": "http-lifecycle",
    "question": "What happens when a client sends an HTTP request to a server?",
    "studentAnswer": "The client directly accesses the database",
    "expectedConcept": "The client sends a request, the server processes it, and returns a response; the client does not directly access server resources"
  }'\n`);

// Test 7: Retry - Improved
console.log('7️⃣  RETRY EVALUATION - STUDENT IMPROVED');
console.log('─────────────────────────────────────────────────────');
console.log(`curl -X POST http://localhost:3000/api/retry \\
  -H "Content-Type: application/json" \\
  -d '{
    "originalMistake": "conceptual",
    "retryAnswer": "The browser enforces CORS as a security policy. The server provides headers, but the browser decides whether to allow the request",
    "expectedConcept": "CORS is a browser-enforced security policy; the server only provides headers, but the browser decides whether to block or allow the request"
  }'\n`);

// Test 8: Retry - Not Improved
console.log('8️⃣  RETRY EVALUATION - STUDENT STILL CONFUSED');
console.log('─────────────────────────────────────────────────────');
console.log(`curl -X POST http://localhost:3000/api/retry \\
  -H "Content-Type: application/json" \\
  -d '{
    "originalMistake": "conceptual",
    "retryAnswer": "The server blocks it for security",
    "expectedConcept": "CORS is a browser-enforced security policy"
  }'\n`);

// Test 9: Error - Missing Fields
console.log('9️⃣  ERROR HANDLING - MISSING FIELDS');
console.log('─────────────────────────────────────────────────────');
console.log(`curl -X POST http://localhost:3000/api/attempt \\
  -H "Content-Type: application/json" \\
  -d '{
    "subject": "web-development"
  }'\n`);

console.log('═══════════════════════════════════════════════════════\n');
console.log('💡 TIP: Use jq to pretty-print JSON responses:');
console.log('   curl ... | jq\n');
console.log('💡 TIP: Check server logs in the other terminal for diagnostics\n');
console.log('📝 Available topics: web-development (cors, http-lifecycle)');
console.log('                     computer-networks (dns, tcp-handshake)\n');
