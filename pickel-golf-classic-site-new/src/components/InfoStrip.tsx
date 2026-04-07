import React from 'react';

interface InfoStripProps {
  dates: string;
  location: string;
  registrationStatus: 'open' | 'closed';
  registrationDeadline: string;
  entryFee: string;
}

const InfoStrip: React.FC<InfoStripProps> = ({ dates, location, registrationStatus, registrationDeadline, entryFee }) => {
  return (
    <div className="bg-cream max-w-4xl mx-auto" style={{ boxShadow: '0 4px 40px rgba(0,0,0,0.3)' }}>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 py-4 px-6">
        <div className="text-center py-4 md:py-0 md:px-6 md:border-r md:border-cream-dark">
          <p className="overline mb-1">When &amp; Where</p>
          <p className="font-display font-semibold text-2xl text-text-dark">{dates}</p>
          <p className="font-display italic text-text-muted text-base mt-1">{location}</p>
        </div>
        <div className="text-center py-4 md:py-0 md:px-6 md:border-r md:border-cream-dark">
          <p className="overline mb-1">Registration</p>
          <p className="font-display font-semibold text-2xl text-text-dark capitalize">{registrationStatus}</p>
          <p className="font-display italic text-text-muted text-base mt-1">Deadline: {registrationDeadline}</p>
        </div>
        <div className="text-center py-4 md:py-0 md:px-6">
          <p className="overline mb-1">Entry Fee</p>
          <p className="font-display font-semibold text-2xl text-text-dark">{entryFee}</p>
          <p className="font-display italic text-text-muted text-base mt-1">Greens fees &amp; shirt included</p>
        </div>
      </div>
    </div>
  );
};

export default InfoStrip;
