import express from "express";
import session from "express-session";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import testRoutes from "./routes/testRoutes.js";

const app = express();
const PORT = 3001;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    secret: "library-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use("/api", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api", reservationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/test", testRoutes);

app.listen(PORT, () => {
  console.log(`Library API running on http://localhost:${PORT}`);
});
