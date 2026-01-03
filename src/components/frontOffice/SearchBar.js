// src/components/frontoffice/SearchBar.js
import React from 'react';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="input-group">
      <span className="input-group-text">
        <i className="bi bi-search"></i>
      </span>
      <input
        type="text"
        className="form-control"
        placeholder="Search posts by title or content..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={() => onChange('')}
        >
          ✕
        </button>
      )}
    </div>
  );
}