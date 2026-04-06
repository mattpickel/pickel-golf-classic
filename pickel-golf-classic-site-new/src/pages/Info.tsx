import React from 'react';
import Container from '../components/Container';
import { useNavigate } from 'react-router-dom';

const Info: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <div className="space-y-5">
                <h1 className="font-display text-2xl md:text-3xl text-green-900 text-center font-bold">
                    Tournament Information
                </h1>
                <div className="gold-divider"></div>

                <p className="font-body text-gray-700 leading-relaxed">
                    Founded in 2021, the Pickel Golf Classic has quickly become one of the premiere events for amateur
                    golfers in middle Tennessee. This year, the tournament will once again be returning to beautiful
                    Greenbrier, TN at the historic Oak Hills Golf Course. We are expecting a record turnout, so be sure
                    to secure your spot in this year's field as soon as possible!
                </p>

                <p className="font-body text-gray-700 leading-relaxed">
                    Registration for the tournament will include a $150 per person entry fee, which covers the cost of greens
                    fees and a golf shirt for Saturday, August 29th and Sunday, August 30th. Golfers must participate both
                    days of the tournament. Tee time is 9 AM at Oak Hills Golf Course. This fee is 100% refundable up to
                    48 hours prior to the tournament start time of 9 AM.
                </p>

                <p className="font-body text-gray-700 leading-relaxed">
                    There will also be an optional round on Friday afternoon (August 28th, around 3-4 PM) and Monday
                    (August 31st). Please indicate if you would like to play on these days during your registration.
                    These rounds will not be included in the tournament fees or scoring and will be optional.
                </p>

                <div className="bg-green-900/5 border border-green-800/10 rounded-lg p-5">
                    <p className="font-display text-green-900 font-bold text-lg mb-1">New This Year</p>
                    <p className="font-body text-gray-700 leading-relaxed">
                        Team format with a trophy presentation at the conclusion of Sunday's rounds. More information to
                        come following registration.
                    </p>
                </div>

                <div className="gold-divider"></div>

                <div className="bg-green-950 rounded-lg p-6 text-center space-y-3">
                    <ul className="space-y-2 font-body text-gold-300">
                        <li className="flex items-center justify-center gap-2">
                            <span className="text-gold-500 font-semibold">Date:</span> Saturday August 29th &amp; Sunday August 30th
                        </li>
                        <li className="flex items-center justify-center gap-2">
                            <span className="text-gold-500 font-semibold">Location:</span> Oak Hills Golf Course, Greenbrier TN
                        </li>
                        <li className="flex items-center justify-center gap-2">
                            <span className="text-gold-500 font-semibold">Cost:</span> $150 (Covers Greens Fees/Shirt)
                        </li>
                        <li className="flex items-center justify-center gap-2">
                            <span className="text-gold-500 font-semibold">Register by:</span> End of May
                        </li>
                    </ul>
                    <button className="btn-secondary mt-4" onClick={() => navigate('/register')}>
                        Register Now
                    </button>
                </div>
            </div>
        </Container>
    );
}

export default Info;
