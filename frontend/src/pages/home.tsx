import { GET_BOOKS } from "@/api/queries";
import { BookCard, Loader } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Book } from "@/types";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const HomePage = () => {
  const { loading, data, error } = useQuery(GET_BOOKS);
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Please try again.",
        action: (
          <ToastAction
            altText="Try again"
            onClick={() => window.location.reload()}
          >
            Try again
          </ToastAction>
        ),
        variant: "destructive",
      });
    }
  }, [error, toast]);

  if (loading) {
    return <Loader />;
  }

  const filteredBooks = data.books.filter((book: Book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <div className="flex items-center justify-between">
        <h1 className="text-center text-4xl font-bold my-4">Book Store</h1>
        <Button onClick={() => navigate("/add-book")}>Add Book</Button>
      </div>
      <div className="flex items-center justify-between gap-5 max-w-[600px] mx-auto">
        <Input
          placeholder="Search by book name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button>Search</Button>
      </div>
      <div className="py-5 flex gap-5 flex-wrap">
        {filteredBooks.map((book: Book) => (
          <Link key={book.id} to={"books/" + book.id} role="button">
            <BookCard {...book} />
          </Link>
        ))}
      </div>
    </div>
  );
};
