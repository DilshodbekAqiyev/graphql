import { useQuery, useMutation } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { GET_BOOK, GET_BOOKS } from "@/api/queries";
import { UPDATE_BOOK, DELETE_BOOK } from "@/api/mutations";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const SingleBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    loading,
    data: { book } = {},
    error,
  } = useQuery(GET_BOOK, {
    variables: { id },
  });

  const [updateBook] = useMutation(UPDATE_BOOK);
  const [deleteBook] = useMutation(DELETE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (book) {
      setIsEditing(false);
    }
  }, [book]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    setIsDeleting(true);
  };

  const closeModal = () => {
    setIsEditing(false);
    setIsDeleting(false);
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const title = formData.get("title");
    const createdDate = formData.get("createdDate");
    const bookPages = formData.get("bookPages");

    updateBook({
      variables: {
        id,
        title,
        createdDate,
        bookPages: Number(bookPages),
      },
    })
      .then(() => {
        console.log("Book updated successfully");
      })
      .catch((error) => {
        console.error("Error updating book:", error);
      })
      .finally(() => closeModal());
  };

  const handleSubmitDelete = () => {
    deleteBook({
      variables: {
        id,
      },
    })
      .then(() => {
        console.log("Book deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
      })
      .finally(() => {
        closeModal();
        navigate("/");
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!book) {
    return <div>No book found with the provided ID</div>;
  }

  return (
    <div className="container">
      <Button onClick={() => navigate("/")}>Home</Button>
      <div className="max-w-[600px] mx-auto my-5">
        <Skeleton className="w-[500px] mx-auto h-[300px]" />
        <h2 className="text-6xl text-center">{book?.title}</h2>
        <p>Created Date: {book?.createdDate}</p>
        <p>Book Pages: {book?.bookPages}</p>
        <div className="flex justify-end items-center gap-5">
          <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogTrigger>
              <Button onClick={handleEdit} variant="secondary">
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Book</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmitEdit} className="flex flex-col gap-5">
                <Input type="text" defaultValue={book?.title} name="title" />
                <Input
                  type="date"
                  defaultValue={book?.createdDate}
                  name="createdDate"
                />
                <Input
                  type="number"
                  defaultValue={book?.bookPages}
                  name="bookPages"
                />
                <DialogFooter>
                  <Button type="submit">Save Changes</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={isDeleting} onOpenChange={setIsDeleting}>
            <DialogTrigger>
              <Button onClick={handleDelete} variant="secondary">
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Book</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                Are you sure you want to delete the book "{book.title}"?
              </DialogDescription>
              <DialogFooter>
                <Button onClick={handleSubmitDelete}>Confirm</Button>
                <Button onClick={closeModal}>Cancel</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
