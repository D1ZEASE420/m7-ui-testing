import { Router } from "express";
import { store } from "../data/store.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

router.get("/my-reservations", requireAuth, (req, res) => {
  const userId = req.session.userId;
  const reservations = store.reservations
    .filter((r) => r.userId === userId && r.status === "active")
    .map((r) => {
      const book = store.books.find((b) => b.id === r.bookId);
      return { ...r, book };
    });
  res.json(reservations);
});

router.post("/reservations", requireAuth, (req, res) => {
  const userId = req.session.userId;
  const { bookId } = req.body;

  if (!bookId) {
    return res.status(400).json({ error: "bookId is required" });
  }

  const book = store.books.find((b) => b.id === bookId);
  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  if (!book.available) {
    return res.status(400).json({ error: "Book is not available" });
  }

  const existing = store.reservations.find(
    (r) => r.userId === userId && r.bookId === bookId && r.status === "active"
  );
  if (existing) {
    return res.status(400).json({ error: "You have already reserved this book" });
  }

  const reservation = {
    id: store.nextReservationId++,
    userId,
    bookId,
    createdAt: new Date().toISOString(),
    status: "active",
  };

  store.reservations.push(reservation);

  const book2 = store.books.find((b) => b.id === bookId);
  return res.status(201).json({ ...reservation, book: book2 });
});

router.delete("/reservations/:id", requireAuth, (req, res) => {
  const userId = req.session.userId;
  const reservationId = parseInt(req.params.id, 10);

  const index = store.reservations.findIndex(
    (r) => r.id === reservationId && r.userId === userId && r.status === "active"
  );

  if (index === -1) {
    return res.status(404).json({ error: "Reservation not found" });
  }

  store.reservations[index].status = "cancelled";
  res.json({ message: "Reservation cancelled" });
});

export default router;
