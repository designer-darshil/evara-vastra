import React from "react";
import { Quote } from "lucide-react";

export const CustomerNotesSection: React.FC = () => {
  const patronNotes = [
    {
      id: "note-1",
      quote:
        "The Raga Silk is unlike any commercial saree I have draped. The Kadwa weave is so clean on the reverse that there is zero friction against the skin.",
      author: "Pooja M.",
      location: "Mumbai",
      piece: "Raga Katan Silk Saree",
    },
    {
      id: "note-2",
      quote:
        "Wore the Meera Mulmul for an eight-hour conference in Delhi heat. Crisp, airy, and held its pleats from morning until evening.",
      author: "Ananya R.",
      location: "Bengaluru",
      piece: "Meera Handloom Mulmul",
    },
    {
      id: "note-3",
      quote:
        "The tested gold zari in the Kashi Banarasi has the exact antique glow of vintage family heirlooms. Truly exceptional craft.",
      author: "Devika S.",
      location: "London",
      piece: "Kashi Gold Kadwa Banarasi",
    },
  ];

  return (
    <section
      style={{
        paddingTop: "6rem",
        paddingBottom: "6rem",
        backgroundColor: "var(--bg-primary)",
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--accent-wine)",
              display: "block",
              marginBottom: "0.4rem",
            }}
          >
            PATRON REFLECTIONS
          </span>
          <h2
            className="font-serif"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "var(--text-primary)" }}
          >
            In the Words of Our Patrons
          </h2>
          <p
            style={{
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              fontStyle: "italic",
              marginTop: "0.3rem",
            }}
          >
            (Sample patron experiences — editable demo notes)
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
          }}
        >
          {patronNotes.map((note) => (
            <div
              key={note.id}
              style={{
                backgroundColor: "#FFFFFF",
                padding: "2.5rem 2rem",
                border: "1px solid var(--border-subtle)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "var(--shadow-subtle)",
              }}
            >
              <div>
                <Quote
                  size={24}
                  style={{ color: "var(--accent-gold)", opacity: 0.6, marginBottom: "1rem" }}
                />
                <p
                  className="font-serif"
                  style={{
                    fontSize: "1.15rem",
                    lineHeight: 1.6,
                    color: "var(--text-primary)",
                    fontStyle: "italic",
                    marginBottom: "1.5rem",
                  }}
                >
                  "{note.quote}"
                </p>
              </div>

              <div
                style={{
                  borderTop: "1px solid var(--border-subtle)",
                  paddingTop: "1rem",
                }}
              >
                <div
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                  }}
                >
                  {note.author}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "0.15rem",
                  }}
                >
                  <span>{note.location}</span>
                  <span style={{ color: "var(--accent-gold)" }}>{note.piece}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
