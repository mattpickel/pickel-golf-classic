import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeroProps {
  annualNumber: number;
  dates: string;
  venue: string;
}

const Hero: React.FC<HeroProps> = ({ annualNumber, dates, venue }) => {
  const navigate = useNavigate();

  const ordinal = (n: number) => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  return (
    <section className="text-center py-8 px-6 w-full">
      <p className="overline mb-4">The {ordinal(annualNumber)} Annual</p>
      <h1 className="font-display font-semibold text-5xl md:text-7xl lg:text-[4.75rem] text-white leading-tight">
        Pickel<br />Golf Classic
      </h1>
      <div className="gold-rule" style={{ width: '60px' }} />
      <p className="font-display italic text-secondary-color/70 text-xl md:text-2xl mb-1">{venue}</p>
      <p className="font-display italic text-secondary-color/70 text-xl md:text-2xl mb-6">{dates}</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="btn-gold" onClick={() => navigate('/register')}>
          Register for the Tournament
        </button>
        <button className="btn-outline-gold" onClick={() => navigate('/info')}>
          Tournament Info
        </button>
      </div>
    </section>
  );
};

export default Hero;
