'use client'; // Needed for interactivity (like dark mode toggle)

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';    // ← make sure this is here
import './Navbar.css';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div>
          <Link href="/">
            <Image
              src="/images/logo.png"  // ← public/images/logo.png
              alt="Site logo"
              width={40}
              height={40}
              style={{ objectFit: 'contain' }}
            />
          </Link>
        </div>
        
        <Link href="/"><button className="nav-button">Home</button></Link>
        <Link href="/explore"><button className="nav-button">Explore</button></Link>
      </div>

      <div className="navbar-center">
        <input type="text" className="search-bar" placeholder="Search..." />
      </div>

      <div className="navbar-right">
        <button onClick={() => setDarkMode(!darkMode)} className="nav-button">
          {darkMode ? '☀️' : '🌙'}
        </button>
        <Link href="/profile"><button className="nav-button">👤</button></Link>
      </div>
    </nav>
  );
}
