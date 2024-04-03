import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home";
import { SingleBook } from "./pages/single-book";
import { AddBookPage } from "./pages/add-book";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" Component={HomePage} />
      <Route path="books/:id" Component={SingleBook} />
      <Route path="add-book" Component={AddBookPage} />
    </Routes>
  );
};
