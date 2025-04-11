import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import BookCard from "../components/BookCard";

interface Book {
  id: number;
  title: string;
  authors: string;
  description: string;
  thumbnail: string;
  googleBookId: string;
}

const Dashboard = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch("/api/books/favorites", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch books");

        const data = await response.json();
        setBooks(data); // ✅ Now it's just an array of books
      } catch (err) {
        console.error("Error fetching favorite books:", err);
      }
    };

    fetchFavorites();
  }, [token]);

  const handleDelete = async (bookId: number) => {
    try {
      const response = await fetch(`/api/favorites/${bookId}`, {
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
  {books.length === 0 ? (
    <p>No favorite books yet. Go save some from the search page!</p>
  ) : (
    books.map((book) => (
      <BookCard
        key={book.id}
        id={book.id.toString()}
        title={book.title}
        authors={book.authors.split(",")}
        thumbnail={book.thumbnail}
        actionLabel="Remove"
        onAction={() => handleDelete(book.id)}
      />
    ))
  )}
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