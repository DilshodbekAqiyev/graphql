import { BookIcon } from "lucide-react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="flex items-center justify-between">
      <BookIcon size={24} />
      <div>
        <div>
          <Link to="/">Home</Link>
        </div>
      </div>
    </div>
  );
};
