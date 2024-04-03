export interface Book {
  id: string;
  title: string;
  bookPages: number;
  createdDate: string;
  authorId: string;
}

export interface BooksData {
  books: Book[];
}
