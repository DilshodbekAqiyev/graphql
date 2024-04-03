import { generator } from "./utils/generator.js";

const gen = generator();

let authors = [
  { id: "1", name: "Author 1", books: ["1"], role: "Author" },
  { id: "2", name: "Author 2", books: ["2"], role: "Author" },
];

let books = [
  {
    id: "1",
    title: "Book 1",
    authorId: "1",
    createdDate: "2022-01-01",
    bookPages: 200,
  },
  {
    id: "2",
    title: "Book 2",
    authorId: "2",
    createdDate: "2022-02-01",
    bookPages: 250,
  },
];

export const resolvers = {
  Query: {
    books: () => books,
    book: (_, { id }) => books.find((book) => book.id === id),
    author: (_, { id }) => authors.find((author) => author.id === id),
  },
  Mutation: {
    createBook: (_, { title, authorId, createdDate, bookPages }) => {
      const author = authors.find((author) => author.id === authorId);
      if (author) {
        const newBook = {
          id: gen.next().value,
          title,
          authorId,
          createdDate,
          bookPages,
        };
        books.push(newBook);
        author.books.push(newBook.id);
        return newBook;
      }
      return null;
    },
    updateBook: (_, { id, title, createdDate, bookPages }) => {
      const book = books.find((book) => book.id === id);
      if (book) {
        book.title = title;
        book.createdDate = createdDate;
        book.bookPages = bookPages;
        return book;
      }
      return null;
    },
    deleteBook: (_, { id }) => {
      const index = books.findIndex((book) => book.id === id);
      if (index !== -1) {
        const deletedBook = books.splice(index, 1)[0];
        return deletedBook;
      }
      return null;
    },
  },
};
