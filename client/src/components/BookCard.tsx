import React, { useState } from "react";

interface Book {
  id: string;
  title: string;
  authors: string[] | string;
  thumbnail: string;
  onAction?: () => void;
  actionLabel?: string;
}

const BookCard: React.FC<Book> = ({
  id,
  title,
  authors,
  thumbnail,
  onAction,
  actionLabel,
}) => {
  const [email, setEmail] = useState("");
  const [showForm, setShowForm] = useState(false);

  const sendRecommendation = async () => {
    try {
      const res = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: email,
          book: { id, title, authors, thumbnail },
        }),
      });

      if (!res.ok) throw new Error("Email failed");
      alert("Email sent successfully");
    } catch (err) {
      console.error("Failed to send email", err);
    }
  };

  return (
    <div className="book-card">
      {thumbnail && <img src={thumbnail} alt={title} />}
      <h4>{title}</h4>
      <p>{Array.isArray(authors) ? authors.join(", ") : authors}</p>

      {onAction && <button onClick={onAction}>{actionLabel || "Action"}</button>}

      <button onClick={() => setShowForm(!showForm)}>Recommend via Email</button>

      {showForm && (
        <div>
          <input
            type="email"
            placeholder="Recipient email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={sendRecommendation}>Send</button>
        </div>
      )}
    </div>
  );
};

export default BookCard;



// import React, { useState } from "react";

// interface Book {
//   id: string;
//   title: string;
//   authors: string[] | string;
//   thumbnail: string;
//   onAction?: () => void;
//   actionLabel?: string;
// }

// const BookCard: React.FC<Book> = ({
//   id,
//   title,
//   authors,
//   thumbnail,
//   onAction,
//   actionLabel,
// }) => {
//   const [email, setEmail] = useState("");
//   const [showForm, setShowForm] = useState(false);

//   const sendRecommendation = async () => {
//     try {
//       const res = await fetch("/api/email", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           to: email,
//           book: { id, title, authors, thumbnail },
//         }),
//       });

//       if (!res.ok) throw new Error("Email failed");
//       alert("Email sent successfully");
//     } catch (err) {
//       console.error("Failed to send email", err);
//     }
//   };

//   return (
//     <div style={{ border: "1px solid #ccc", margin: 8, padding: 8 }}>
//       {thumbnail && <img src={thumbnail} alt={title} style={{ height: 100 }} />}
//       <h4>{title}</h4>
//       <p>{Array.isArray(authors) ? authors.join(", ") : authors}</p>

//       {onAction && <button onClick={onAction}>{actionLabel || "Action"}</button>}

//       <button onClick={() => setShowForm(!showForm)}>Recommend via Email</button>

//       {showForm && (
//         <div>
//           <input
//             type="email"
//             placeholder="Recipient email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <button onClick={sendRecommendation}>Send</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookCard;