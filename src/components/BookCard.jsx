import bookIcon from "../assets/svg/book.svg";
import writerIcon from "../assets/svg/writer.svg";
import locationIcon from "../assets/svg/locationIcon.svg";

export default function BookCard({ book }) {
  return (
    <div className="border px-4 py-2 my-2 w-fit rounded-3xl h-[26rem] relative">
      <div className="h-56 w-48 rounded-2xl overflow-hidden shadow-lg shadow-[#d7b697] my-4 overflow-hidden">
        <img
          className="h-full w-full hover:scale-110 transition duration-300 ease-in-out"
          src={book.bookURL}
          alt={book.title}
        />
      </div>

      <div className="flex items-center gap-2">
        <img className="h-6 w-6" src={bookIcon} alt="Book Icon" />
        <h4 className="font-bold text-wrap w-40">{book.title}</h4>
      </div>

      <h5 className="flex items-center gap-2">
        <img className="h-6 w-6" src={writerIcon} alt="Writer Icon" />
        {book.author}
      </h5>

      <p className="flex items-center gap-2">
        <img className="h-5 w-5" src={locationIcon} alt="Location Icon" />
        {book.location}
      </p>
    </div>
  );
}
