import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import BookCard from "../components/BookCard";

interface Book {
  id: string;
  title: string;
  authors: string[];
  thumbnail: string;
}

const Dashboard = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const { token } = useAuth();
  console.log("JWT Token:", token);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch("/api/books", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch books");

        const data = await response.json();
        setBooks(data);
      } catch (err) {
        console.error("Error fetching favorite books:", err);
      }
    };

    fetchFavorites();
  }, [token]);

  const handleDelete = async (bookId: string) => {
    try {
      const response = await fetch(`/api/books/${bookId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete book");

      setBooks((prev) => prev.filter((b) => b.id !== bookId));
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  };

  return (
    <div className="container">
      <h2>Your Favorite Books</h2>
      <div className="results">
        {books.map((book) => (
          <BookCard
            key={book.id}
            {...book}
            actionLabel="Remove"
            onAction={() => handleDelete(book.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;


// import { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext";

// interface Book {
//   id: string;
//   title: string;
//   authors: string[];
//   thumbnail: string;
// }

// const Dashboard = () => {
//   const [books, setBooks] = useState<Book[]>([]);
//   const { token } = useAuth();

//   useEffect(() => {
//     const fetchFavorites = async () => {
//       try {
//         const response = await fetch("/api/books", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) throw new Error("Failed to fetch books");

//         const data = await response.json();
//         setBooks(data);
//       } catch (err) {
//         console.error("Error fetching favorite books:", err);
//       }
//     };

//     fetchFavorites();
//   }, [token]);

//   return (
//     <div className="container">
//       <h2>Your Favorite Books</h2>
//       <div className="results">
//         {books.map((book) => (
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

// export default Dashboard;