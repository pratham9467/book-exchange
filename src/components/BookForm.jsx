import { useRef } from "react";
import axios from "axios";

function BookForm() {
  const titleRef = useRef();
  const authorRef = useRef();
  const cityRef = useRef();
  const bookURL = useRef();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBook = {
      title: titleRef.current.value,
      author: authorRef.current.value,
      location: cityRef.current.value,
      ownerEmail: user.email,
      contact: user.mobile,
      bookURL: bookURL.current.value,
    };

    const bookAdded = await axios.post("https://book-exchange-red.vercel.app/api/books", newBook, {
      withCredentials: true,
    });
    alert("Book added!");
    e.target.reset();

    if (bookAdded) {
      window.location.reload();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 [&>input]:focus:outline-none [&>input]:focus:ring-2 [&>input]:focus:ring-orange-500 [&>input]:bg-transparent [&>input]:rounded-3xl [&>button]:rounded-3xl my-12">
      <h2 className="text-2xl text-orange-500 font-semibold my-4 tracking-tight">Add Books For Exchange</h2>
      <input ref={titleRef} placeholder="Title" className="w-full border p-2" />
      <input ref={authorRef} placeholder="Author" className="w-full border p-2" />
      <input ref={cityRef} placeholder="City/Location" className="w-full border p-2" />
      <input ref={bookURL} placeholder="Book Image URL" className="w-full border p-2" />
      <button className="bg-orange-500 px-4 py-2 rounded text-white">Add Book</button>
    </form>
  );
}
export default BookForm;
