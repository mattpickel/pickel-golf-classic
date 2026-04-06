import React, { useState } from 'react';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import hamburgerIcon from '../assets/hamburger.svg';
import closeIcon from '../assets/close.svg';

const Navbar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const linkClasses = "text-gold-300 hover:text-gold-400 transition-colors duration-200 font-body text-sm tracking-wide uppercase";

  return (
    <nav className="bg-green-950/90 backdrop-blur-sm border-b border-gold-500/20">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        <div className="flex items-center space-x-6">
          <button className="text-gold-300 lg:hidden" onClick={toggleMenu}>
            <img src={hamburgerIcon} alt="Menu" className="w-6 h-6 navbar-toggle" />
          </button>
          <Link to="/" className={`${linkClasses} hidden lg:block`}>Home</Link>
          <Link to="/info" className={`${linkClasses} hidden lg:block`}>Info</Link>
          <Link to="/register" className={`${linkClasses} hidden lg:block`}>Register</Link>
          <Link to="/layfans-terms" className={`${linkClasses} hidden lg:block`}>LayFan's Terms</Link>
        </div>
        <div className="flex items-center space-x-4">
          <SignedOut>
            <button onClick={openModal} className={linkClasses}>Login</button>
          </SignedOut>
          <SignedIn>
            <Link to="/details" className={`${linkClasses} hidden lg:block`}>My Details</Link>
            <UserButton />
          </SignedIn>
        </div>
      </div>
      <div
        className={`absolute top-0 left-0 w-full bg-green-950 text-gold-300 flex flex-col items-center space-y-4 py-6 lg:hidden transition-transform duration-300 z-50 border-b border-gold-500/30 ${
          isMenuOpen ? 'transform translate-y-0' : 'transform -translate-y-full'
        }`}
      >
        <Link to="/" className={linkClasses} onClick={toggleMenu}>Home</Link>
        <Link to="/info" className={linkClasses} onClick={toggleMenu}>Info</Link>
        <Link to="/register" className={linkClasses} onClick={toggleMenu}>Register</Link>
        <Link to="/layfans-terms" className={linkClasses} onClick={toggleMenu}>Layfan's Terms</Link>
        <SignedOut>
          <button onClick={() => { openModal(); toggleMenu(); }} className={linkClasses}>Login</button>
        </SignedOut>
        <SignedIn>
          <Link to="/details" className={linkClasses} onClick={toggleMenu}>My Details</Link>
        </SignedIn>
        <button className="text-gold-300 lg:hidden mt-2" onClick={toggleMenu}>
          <img src={closeIcon} alt="Close" className="w-6 h-6 navbar-toggle" />
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </nav>
  );
};

export default Navbar;
