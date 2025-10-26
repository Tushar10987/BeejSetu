import React from 'react';

export default function LiveDot({ className = '', size = 10, pulse = true }) {
  return (
    <span
      className={`inline-block align-middle relative ${className}`}
      style={{ width: size, height: size }}
      aria-label="Live"
    >
      <span
        className={`absolute rounded-full bg-red-500 ${pulse ? 'animate-ping' : ''}`}
        style={{ width: size, height: size, opacity: 0.7 }}
      />
      <span
        className="absolute rounded-full bg-red-600"
        style={{ width: size * 0.6, height: size * 0.6, left: size * 0.2, top: size * 0.2 }}
      />
    </span>
  );
}
