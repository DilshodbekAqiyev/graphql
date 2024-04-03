import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Props } from "./types";

export const BookCard: React.FC<Props> = ({
  title,
  bookPages,
  createdDate,
  authorId,
}) => {
  return (
    <div key={authorId}>
      <Skeleton className="w-[300px] h-[200px] rounded-xl" />
      <h4 className="font-semibold text-xl">{title}</h4>
      <p>Created Date: {createdDate}</p>
      <p>Book pages size: {bookPages}</p>
    </div>
  );
};
