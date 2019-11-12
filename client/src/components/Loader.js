import React from "react";

export default function Loader({ className }) {
  return (
    <div className={className}>
      <div className="spinner"></div>
    </div>
  );
}
