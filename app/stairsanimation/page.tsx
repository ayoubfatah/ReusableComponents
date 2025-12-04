import React from "react";
import "./style.css";

export default function App() {
  const title = "Welcome";
  return (
    <main className="container">
      <div className="wrapper">
        <div className="original-text">
          {title.split("").map((c, i) => (
            <span
              style={{ "--index": i } as React.CSSProperties}
              key={c + i}
              className="original-character"
            >
              {c}
            </span>
          ))}
        </div>
        <div className="clone-text">
          {title.split("").map((c, i) => (
            <span
              style={{ "--index": i } as React.CSSProperties}
              key={c + i}
              className="clone-character"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
