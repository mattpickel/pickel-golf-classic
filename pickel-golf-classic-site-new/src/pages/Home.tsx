import React from 'react';
import Hero from '../components/Hero';
import InfoStrip from '../components/InfoStrip';

const Home: React.FC = () => {
    return (
        <div className="flex flex-col min-h-0 flex-1">
            <div className="flex-1 flex items-center">
                <Hero
                    annualNumber={6}
                    dates="August 29–30, 2026"
                    venue="Oak Hills Golf Course · Greenbrier, TN"
                />
            </div>
            <InfoStrip
                dates="Sat Aug 29 & Sun Aug 30"
                location="Oak Hills Golf Course, Greenbrier TN"
                registrationStatus="open"
                registrationDeadline="End of May"
                entryFee="$150"
            />
        </div>
    );
}

export default Home;
