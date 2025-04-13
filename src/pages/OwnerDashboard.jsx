import BookForm from "../components/BookForm";
import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";

export default function OwnerDashboard() {
  const [books, setBooks] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("https://book-exchange-red.vercel.app/api/books");
        const myBooks = res.data.filter((book) => book.ownerEmail === user.email);
        setBooks(myBooks);
      } catch (err) {
        alert("Failed to fetch books. Please try again later.");
        console.error(err);
      }
    };

    fetchBooks();
  }, [user.email]);

  return (
    <div className="flex flex-row-reverse h-screen overflow-hidden">
      <div className="w-[30%] p-8 bg-orange-200">
        <h2 className="text-3xl font-bold mb-4">Welcome, {user.name}</h2>
        <BookForm />
      </div>
      <div className="bg-orange-500 min-h-screen h-full w-[1px]" />
      <div className="w-[70%] px-4 overflow-y-scroll bg-orange-100">
        <h3 className="text-2xl font-bold mt-6">Your Books</h3>
        {books.length === 0 ? (
          <p className="text-gray-500">No books listed yet.</p>
        ) : (
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {books.map((book) => (
              <div key={book.id}>
                <BookCard key={book.id} book={book} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
