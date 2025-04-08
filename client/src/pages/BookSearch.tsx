import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import BookCard from "../components/BookCard";

interface Book {
  id: string;
  title: string;
  authors: string[];
  thumbnail: string;
}

const BookSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const { token } = useAuth();

  const handleSearch = async () => {
    if (!query) return;
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`
    );
    const data = await res.json();
    const books = data.items?.map((item: any) => ({
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors || [],
      thumbnail: item.volumeInfo.imageLinks?.thumbnail || "",
    })) || [];
    setResults(books);
  };

  const handleSave = async (book: Book) => {
    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(book),
      });

      if (!response.ok) {
        throw new Error("Failed to save book");
      }

      alert("Book saved!");
    } catch (err) {
      console.error("Error saving book:", err);
    }
  };

  return (
    <div className="container">
      <h2>Search Books</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter book title"
      />
      <button onClick={handleSearch}>Search</button>
      <div className="results">
        {results.map((book) => (
          <BookCard
            key={book.id}
            {...book}
            actionLabel="Save to Favorites"
            onAction={() => handleSave(book)}
          />
        ))}
      </div>
    </div>
  );
};

export default BookSearch;


// import { useState } from "react";

// interface Book {
//   id: string;
//   title: string;
//   authors: string[];
//   thumbnail: string;
// }

// const BookSearchPage = () => {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState<Book[]>([]);

//   const handleSearch = async () => {
//     if (!query) return;
//     const res = await fetch(
//       `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`
//     );
//     const data = await res.json();
//     const books = data.items?.map((item: any) => ({
//       id: item.id,
//       title: item.volumeInfo.title,
//       authors: item.volumeInfo.authors || [],
//       thumbnail: item.volumeInfo.imageLinks?.thumbnail || "",
//     })) || [];
//     setResults(books);
//   };

//   return (
//     <div className="container">
//       <h2>Search Books</h2>
//       <input
//         type="text"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         placeholder="Enter book title"
//       />
//       <button onClick={handleSearch}>Search</button>
//       <div className="results">
//         {results.map((book) => (
//           <div key={book.id} style={{ border: "1px solid #ccc", margin: 8, padding: 8 }}>
//             {book.thumbnail && <img src={book.thumbnail} alt={book.title} style={{ height: 100 }} />}
//             <h4>{book.title}</h4>
//             <p>{book.authors.join(", ")}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BookSearchPage;