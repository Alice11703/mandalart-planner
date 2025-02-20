import React from "react";

interface FooterProps {
  className?: string;
}

export default function Footer({ className = "" }: FooterProps) {
  return (
    <footer className={`text-center py-4 text-gray-500 ${className}`}>
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()}. Kim Koeun All rights reserved.</p>
      </div>
    </footer>
  );
}
