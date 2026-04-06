import React from 'react';
import { Link } from 'react-router-dom';
import SpotifyPlayer from './SpotifyPlayer';

const Footer: React.FC = () => {
  return (
    <div>
      <SpotifyPlayer />
      <footer className="bg-green-950/90 backdrop-blur-sm border-t border-gold-500/20 py-3">
        <div className="container mx-auto text-center">
          <Link to="/layfans-terms" className="inline-block hover:opacity-80 transition-opacity">
            <p className="text-gold-300/70 text-xs font-body uppercase tracking-widest">Presented by</p>
            <p className="text-gold-400 font-display text-sm mt-0.5">The LayFan's Terms Podcast</p>
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
