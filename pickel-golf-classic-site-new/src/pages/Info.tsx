import React from 'react';
import PageHeader from '../components/PageHeader';
import { useNavigate } from 'react-router-dom';

const Info: React.FC = () => {
    const navigate = useNavigate();

    return (
        <>
            <PageHeader annualNumber={6} title="Tournament Information" />
            <div className="content-panel">
                <div className="max-w-2xl mx-auto px-6 py-12">
                    <p className="font-display text-xl text-text-dark leading-relaxed mb-6">
                        Founded in 2021, the Pickel Golf Classic has quickly become one of the premiere events for amateur
                        golfers in middle Tennessee. This year, the tournament will once again be returning to beautiful
                        Greenbrier, TN at the historic Oak Hills Golf Course. We are expecting a record turnout, so be sure
                        to secure your spot in this year's field as soon as possible!
                    </p>

                    <div className="gold-rule" />

                    <h2 className="font-display font-semibold text-3xl text-text-dark mb-4">Schedule &amp; Format</h2>
                    <p className="font-display text-xl text-text-dark leading-relaxed mb-4">
                        Registration includes a <strong>$150 per person</strong> entry fee, which covers greens fees and a
                        golf shirt for Saturday, August 29th and Sunday, August 30th. Tee time is 9 AM at Oak Hills Golf
                        Course. Golfers must participate both days of the tournament. This fee is 100% refundable up to
                        48 hours prior to the tournament start time.
                    </p>
                    <p className="font-display text-xl text-text-dark leading-relaxed mb-4">
                        There will also be an optional round on Friday afternoon (August 28th, around 3–4 PM) and Monday
                        (August 31st). Please indicate if you would like to play on these days during your registration.
                        These rounds will not be included in the tournament fees or scoring.
                    </p>

                    <div className="bg-white border border-cream-dark border-t-[3px] border-t-secondary-color p-6 my-8">
                        <p className="overline mb-2">New This Year</p>
                        <p className="font-display text-xl text-text-dark leading-relaxed">
                            Team format with a trophy presentation at the conclusion of Sunday's rounds. More information
                            to come following registration.
                        </p>
                    </div>

                    <div className="gold-rule" />

                    <h2 className="font-display font-semibold text-3xl text-text-dark mb-4">At a Glance</h2>
                    <div className="space-y-3 mb-8">
                        <div className="flex gap-3">
                            <span className="overline w-28 shrink-0 pt-1">Dates</span>
                            <span className="font-display text-xl text-text-dark">Saturday August 29th &amp; Sunday August 30th</span>
                        </div>
                        <div className="flex gap-3">
                            <span className="overline w-28 shrink-0 pt-1">Location</span>
                            <span className="font-display text-xl text-text-dark">Oak Hills Golf Course, Greenbrier TN</span>
                        </div>
                        <div className="flex gap-3">
                            <span className="overline w-28 shrink-0 pt-1">Entry Fee</span>
                            <span className="font-display text-xl text-text-dark">$150 (greens fees &amp; shirt included)</span>
                        </div>
                        <div className="flex gap-3">
                            <span className="overline w-28 shrink-0 pt-1">Deadline</span>
                            <span className="font-display text-xl text-text-dark">End of May</span>
                        </div>
                    </div>

                    <div className="text-center">
                        <button className="btn-gold" onClick={() => navigate('/register')}>
                            Register Now
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Info;
