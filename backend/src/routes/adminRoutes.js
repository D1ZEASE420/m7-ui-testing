import { Router } from "express";
import { store } from "../data/store.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = Router();

router.post("/books", requireAdmin, (req, res) => {
  const { title, author, category, available } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ error: "Title is required" });
  }
  if (!author || !author.trim()) {
    return res.status(400).json({ error: "Author is required" });
  }
  if (!category || !category.trim()) {
    return res.status(400).json({ error: "Category is required" });
  }

  const book = {
    id: store.nextBookId++,
    title: title.trim(),
    author: author.trim(),
    category: category.trim(),
    description: "",
    available: available !== false,
  };

  store.books.push(book);
  res.status(201).json(book);
});

router.patch("/books/:id", requireAdmin, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const book = store.books.find((b) => b.id === id);

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  if (typeof req.body.available === "boolean") {
    book.available = req.body.available;
  }
  if (req.body.title !== undefined) book.title = req.body.title;
  if (req.body.author !== undefined) book.author = req.body.author;
  if (req.body.category !== undefined) book.category = req.body.category;

  res.json(book);
});

router.get("/reservations", requireAdmin, (req, res) => {
  const reservations = store.reservations
    .filter((r) => r.status === "active")
    .map((r) => {
      const user = store.users.find((u) => u.id === r.userId);
      const book = store.books.find((b) => b.id === r.bookId);
      return {
        ...r,
        userName: user?.name ?? "Unknown",
        bookTitle: book?.title ?? "Unknown",
      };
    });
  res.json(reservations);
});

export default router;
