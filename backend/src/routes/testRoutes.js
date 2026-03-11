import { Router } from "express";
import { store, resetStore } from "../data/store.js";
import { seedUsers } from "../data/seed.js";

const router = Router();

router.post("/reset", (req, res) => {
  resetStore();
  res.json({ message: "Store reset to seed state" });
});

router.post("/seed", (req, res) => {
  resetStore();
  res.json({ message: "Store seeded", books: store.books.length, users: store.users.length });
});

router.post("/login-as/:role", (req, res) => {
  const { role } = req.params;
  const user = seedUsers.find((u) => u.role === role);
  if (!user) {
    return res.status(400).json({ error: `No user with role: ${role}` });
  }
  req.session.userId = user.id;
  res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
});

export default router;
