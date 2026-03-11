import { seedUsers, seedBooks, seedReservations } from "./seed.js";

function deepCopy(arr) {
  return arr.map((item) => ({ ...item }));
}

export const store = {
  users: deepCopy(seedUsers),
  books: deepCopy(seedBooks),
  reservations: deepCopy(seedReservations),
  nextReservationId: 3,
  nextBookId: 11,
};

export function resetStore() {
  store.users = deepCopy(seedUsers);
  store.books = deepCopy(seedBooks);
  store.reservations = deepCopy(seedReservations);
  store.nextReservationId = 3;
  store.nextBookId = 11;
}
