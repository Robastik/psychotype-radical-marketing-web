"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="container header-content">
        <div className="logo-section">
          <Image src="/logo.png" alt="eyeCARD Logo" height={32} width={32} priority className="logo-image" />
          <span className="technical-data logo-text">
            eyeCARD
          </span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="technical-data nav-menu desktop-nav">
          <Link href="/guide">Методический справочник</Link>
        </nav>

        {/* Hamburger Button - Mobile Only */}
        <button 
          className="hamburger-btn"
          onClick={toggleMenu}
          aria-label="Открыть меню"
          aria-expanded={isMenuOpen}
        >
          <span className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}></div>

      {/* Mobile Navigation Menu */}
      <div className={`mobile-nav-container ${isMenuOpen ? 'open' : ''}`}>
        <nav className="technical-data mobile-nav-menu">
          <Link href="/guide" onClick={() => setIsMenuOpen(false)}>Методический справочник</Link>
        </nav>
      </div>
    </header>
  );
}
