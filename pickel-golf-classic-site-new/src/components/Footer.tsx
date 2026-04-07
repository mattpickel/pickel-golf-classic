import React from 'react';
import { Link } from 'react-router-dom';
import SpotifyPlayer from './SpotifyPlayer';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-color border-t-2 border-secondary-color">
      <div className="max-w-6xl mx-auto px-6 py-5 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Column 1: Tagline */}
        <div>
          <p className="font-display italic text-secondary-color text-xl mb-2">Pickel Golf Classic</p>
          <p className="font-display italic text-[#b8b0a0] text-sm leading-relaxed">
            A gentleman's game among friends &mdash; where the formality is real and the handicaps are generous.
          </p>
        </div>

        {/* Column 2: Quick links */}
        <div className="flex flex-col gap-2">
          <p className="overline mb-1">Quick Links</p>
          <Link to="/" className="font-sans text-[0.7rem] tracking-wide text-[#b8b0a0] hover:text-secondary-color transition-colors">Home</Link>
          <Link to="/info" className="font-sans text-[0.7rem] tracking-wide text-[#b8b0a0] hover:text-secondary-color transition-colors">Tournament Info</Link>
          <Link to="/register" className="font-sans text-[0.7rem] tracking-wide text-[#b8b0a0] hover:text-secondary-color transition-colors">Register</Link>
          <Link to="/layfans-terms" className="font-sans text-[0.7rem] tracking-wide text-[#b8b0a0] hover:text-secondary-color transition-colors">LayFan's Terms</Link>
        </div>

        {/* Column 3: Podcast */}
        <div>
          <p className="overline mb-3">The LayFan's Terms Podcast</p>
          <SpotifyPlayer />
        </div>
      </div>

      <div className="border-t border-green-muted px-6 py-2 text-center">
        <p className="font-sans text-[0.6rem] tracking-wider text-[#b8b0a0]/50 uppercase">
          &copy; {new Date().getFullYear()} Pickel Golf Classic
        </p>
      </div>
    </footer>
  );
};

export default Footer;
