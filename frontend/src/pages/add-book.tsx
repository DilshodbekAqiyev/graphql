import { CREATE_BOOK } from "@/api/mutations";
import { GET_BOOK, GET_BOOKS } from "@/api/queries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

export const AddBookPage = () => {
  const [createBook, { data, loading, error }] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }, { query: GET_BOOK }],
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const addBook = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title")!;
    const createdDate = formData.get("createdDate")!;
    const bookPages = formData.get("bookPages")!;

    if (!title || !createdDate || !bookPages) {
      toast({
        title: "Book is not added",
        description: "Please, fill in all fields to add a book.",
      });
      return;
    }

    try {
      const response = await createBook({
        variables: {
          title,
          createdDate,
          bookPages: Number(bookPages),
          authorId: "1",
        },
      });
      console.log("Book added successfully:", response);
      navigate("/");
    } catch (error) {
      console.error("Error adding book:", error.message);
      toast({
        title: "Error",
        description: "Failed to add the book. Please try again later.",
      });
    }
  };

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;
  if (data) console.log(data);

  return (
    <div className="container">
      <div className="flex justify-between items-center">
        <Button onClick={() => navigate("/")}>Home</Button>
        <h2 className="text-center font-bold text-4xl my-2">Add book</h2>
        <span />
      </div>
      <form
        onSubmit={addBook}
        className="max-w-[600px] mx-auto flex flex-col gap-5"
      >
        <Input type="text" name="title" placeholder="Title" />
        <Input type="date" name="createdDate" />
        <Input type="number" name="bookPages" placeholder="Book pages" />
        <Button type="submit">Add Book</Button>
      </form>
    </div>
  );
};
