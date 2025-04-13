import { useEffect, useState } from "react";
import axios from "axios";
import search from "../assets/svg/search.svg";
import BookCard from "../components/BookCard";

export default function SeekerDashboard() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    try {
      axios.get("https://book-exchange-red.vercel.app/api/books").then((res) => {
        setBooks(res.data);
        setFilteredBooks(res.data);
      });
    } catch {
      alert("Failed to fetch books. Please try again later.");
    }
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterBooks(query);
  };

  const filterBooks = (query) => {
    const filtered = books.filter((book) => {
      const title = book.title ? book.title.toLowerCase() : "";
      const location = book.location ? book.location.toLowerCase() : "";
      const matchesTitle = title.includes(query.toLowerCase());
      const matchesLocation = location.includes(query.toLowerCase());
      return matchesTitle || matchesLocation;
    });
    setFilteredBooks(filtered);
  };

  return (
    <div className="p-4 bg-orange-100 min-h-screen h-full">
      <h2 className="text-3xl font-bold mb-4">Welcome, {user?.name || "Seeker"}</h2>

      <div className="mb-6 flex items-center relative">
        <input
          type="text"
          onChange={handleSearch}
          value={searchQuery}
          placeholder="Search by title or location"
          className="p-2 border rounded-3xl w-full"
        />
        <img className="h-6 w-6 absolute right-5" src={search} alt="search ba" />
      </div>

      <h3 className="text-xl mt-6">Available Listings</h3>
      <div>
        {filteredBooks.length === 0 ? (
          <p className="text-gray-500">No books listed yet.</p>
        ) : (
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {filteredBooks.map((book) => (
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
