import { Router } from "express";
import { store } from "../data/store.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

router.get("/", requireAuth, (req, res) => {
  res.json(store.books);
});

router.get("/:id", requireAuth, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const book = store.books.find((b) => b.id === id);
  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }
  res.json(book);
});

export default router;
