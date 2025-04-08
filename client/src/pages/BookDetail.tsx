import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Book {
  id: string;
  title: string;
  authors: string[];
  description: string;
  thumbnail: string;
}

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
        const data = await res.json();

        const detail: Book = {
          id: data.id,
          title: data.volumeInfo.title,
          authors: data.volumeInfo.authors || [],
          description: data.volumeInfo.description || "No description available.",
          thumbnail: data.volumeInfo.imageLinks?.thumbnail || "",
        };

        setBook(detail);
      } catch (err) {
        console.error("Failed to fetch book details", err);
      }
    };

    if (id) fetchBook();
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>{book.title}</h2>
      <p><strong>Author(s):</strong> {book.authors.join(", ")}</p>
      {book.thumbnail && <img src={book.thumbnail} alt={book.title} style={{ height: 150 }} />}
      <p><strong>Description:</strong> {book.description}</p>
    </div>
  );
};

export default BookDetail;