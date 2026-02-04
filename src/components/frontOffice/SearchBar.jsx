import React from "react";

export default function SearchBar({ value, onChange }) {
  return (
    <div
      className="position-relative my-4"
      style={{ maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}
    >
      <input
        type="text"
        className="form-control"
        placeholder="Search posts by title or content..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          paddingRight: "2.5rem",
          borderColor: "black",
          border: "0.13rem solid black",
          fontSize: "1.05rem",
          backgroundColor: "white",
          padding: "0.5rem 1rem",
        }}
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          style={{
            position: "absolute",
            right: "0.5rem",
            top: "50%",
            transform: "translateY(-50%)",
            border: "none",
            background: "transparent",
            color: "black",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
}
