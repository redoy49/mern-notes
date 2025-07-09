Frontend → sends token to server

Server → initializes Firebase Admin with serviceAccount

Server → creates verifyFirebaseToken middleware

Middleware → verifies token & attaches user info

Routes → protected using middleware


// Install Packages
npm install firebase-admin --save

// Firebase VerifyToken Middleware

const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Middleware to verify Firebase ID token
const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // attach user info to request
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

1. Frontend:
   - User logs in; Firebase issues an ID token.
   - Get token via currentUser.getIdToken().
   - Send token in Authorization header with API requests.

2. Initialize Firebase Admin on the server:
   - Load serviceAccountKey.json.
   - Call admin.initializeApp({ credential: admin.credential.cert(serviceAccount) }).

3. Create middleware verifyFirebaseToken:
   - Extract token from req.headers.authorization.
   - Verify token with admin.auth().verifyIdToken(token).
   - If valid, attach decoded user info to req.user and call next().
   - If invalid, respond with 401 Unauthorized.

4. Server routes:
   - Use verifyFirebaseToken middleware to protect routes.
   - Access req.user in route handler after verification.
   - Process request and respond.

---

Summary:
- Frontend obtains and sends Firebase ID token.
- Firebase Admin initialized on server with service account.
- Middleware verifies token on protected requests.
- Valid tokens allow access; invalid tokens cause 401 errors.
