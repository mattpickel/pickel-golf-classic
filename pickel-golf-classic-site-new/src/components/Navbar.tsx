import React, { useState } from 'react';
import { SignedIn, SignedOut, UserButton, useClerk } from '@clerk/clerk-react';
import { Link, useLocation } from 'react-router-dom';
import hamburgerIcon from '../assets/hamburger.svg';
import closeIcon from '../assets/close.svg';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { openSignIn } = useClerk();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const linkClass = (path: string) =>
    `font-sans text-[0.62rem] tracking-[0.18em] uppercase transition-colors duration-200 ${
      location.pathname === path ? 'text-primary-color font-bold' : 'text-text-mid hover:text-primary-color'
    }`;

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/info', label: 'Info' },
    { to: '/register', label: 'Register' },
    { to: '/layfans-terms', label: "LayFan's Terms" },
  ];

  return (
    <nav className="bg-cream border-b-2 border-secondary-color h-16 px-6 md:px-10 flex items-center justify-between relative z-50">
      <div className="flex items-center gap-8">
        <Link to="/" className="font-display italic text-primary-color text-xl">
          Pickel Golf Classic
        </Link>
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} className={linkClass(link.to)}>
              {link.label}
            </Link>
          ))}
          <SignedIn>
            <Link to="/details" className={linkClass('/details')}>My Registration</Link>
          </SignedIn>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <SignedOut>
          <button
            onClick={() => openSignIn({ redirectUrl: '/details' })}
            className="hidden lg:block font-sans text-[0.62rem] tracking-[0.2em] uppercase font-bold px-6 py-2 border border-primary-color text-primary-color hover:bg-primary-color hover:text-cream transition-colors duration-200"
          >
            Sign In
          </button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <button className="lg:hidden" onClick={toggleMenu}>
          <img src={hamburgerIcon} alt="Menu" className="w-6 h-6" style={{ filter: 'brightness(0) saturate(100%) invert(15%) sepia(20%) saturate(1500%) hue-rotate(70deg)' }} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`absolute top-0 left-0 w-full bg-cream flex flex-col items-center gap-5 py-8 lg:hidden transition-transform duration-300 border-b-2 border-secondary-color shadow-lg ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {navLinks.map(link => (
          <Link key={link.to} to={link.to} className={linkClass(link.to)} onClick={toggleMenu}>
            {link.label}
          </Link>
        ))}
        <SignedIn>
          <Link to="/details" className={linkClass('/details')} onClick={toggleMenu}>My Registration</Link>
        </SignedIn>
        <SignedOut>
          <button
            onClick={() => { openSignIn({ redirectUrl: '/details' }); toggleMenu(); }}
            className={linkClass('')}
          >
            Sign In
          </button>
        </SignedOut>
        <button className="lg:hidden mt-2" onClick={toggleMenu}>
          <img src={closeIcon} alt="Close" className="w-5 h-5" style={{ filter: 'brightness(0) saturate(100%) invert(15%) sepia(20%) saturate(1500%) hue-rotate(70deg)' }} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
