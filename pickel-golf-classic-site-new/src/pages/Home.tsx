import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center gap-8 px-4">
            <img className="w-5/6 sm:w-2/5 drop-shadow-2xl" src="/images/logo2025.PNG" alt="Pickel Golf Classic"></img>

            <div className="text-center">
                <p className="font-display text-gold-400 text-lg sm:text-xl italic">August 28 &ndash; 31, 2026</p>
                <p className="font-body text-gold-300/60 text-sm tracking-widest uppercase mt-1">Oak Hills Golf Course &middot; Greenbrier, TN</p>
            </div>

            <div className="gold-divider w-40"></div>

            <div className="flex flex-col gap-4 items-center">
                <div className="flex flex-row gap-4">
                    <button className="btn-primary w-32 sm:w-44" onClick={() => navigate('/login')}>
                        Login
                    </button>
                    <button className="btn-secondary w-32 sm:w-44" onClick={() => navigate('/register')}>
                        Register
                    </button>
                </div>
                <button className="btn-outline w-32 sm:w-44" onClick={() => navigate('/info')}>
                    Learn More
                </button>
            </div>
        </div>
    );
}

export default Home;
