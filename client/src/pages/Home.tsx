import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";

interface Book {
  id: string;
  title: string;
  authors: string[];
  thumbnail: string;
}

interface GoogleBooksItem {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: {
      thumbnail?: string;
    };
  };
}

const Home = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchTrendingBooks = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=trending&maxResults=8`
        );
        const data = await res.json();
        const parsed = data.items.map((item: GoogleBooksItem) => ({
          id: item.id,
          title: item.volumeInfo.title,
          authors: item.volumeInfo.authors || ["Unknown"],
          thumbnail: item.volumeInfo.imageLinks?.thumbnail || "",
        }));
        setBooks(parsed);
      } catch (err) {
        console.error("Error fetching trending books", err);
      }
    };

    fetchTrendingBooks();
  }, []);

  return (
    <div className="container">
      <div className="banner">
        <h1>Welcome to Page Mates</h1>
        <p>Discover trending books and share your favorites</p>
      </div>

      <section className="recommended">
        <h2>🔥 Recommended Reads</h2>
        <div className="book-grid">
          {books.map((book) => (
            <BookCard key={book.id} {...book} actionLabel="Details" />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;