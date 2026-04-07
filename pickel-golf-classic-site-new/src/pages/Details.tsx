import React, { useEffect, useState } from 'react';
import { SignedIn, SignedOut, RedirectToSignIn, useUser as useClerkUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

interface UserData {
  first_name: string;
  last_name: string;
  registered: boolean;
  paid: boolean;
  shirt: string;
  friday: boolean;
  monday: boolean;
}

const Details: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useClerkUser();
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      try {
        const response = await fetch(`${API_BASE_URL}/user/${user.id}`);
        const result = await response.json();

        if (response.ok) {
          setUserData(result);
        } else {
          console.error('Error fetching user data:', result.message);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <PageHeader annualNumber={6} title="My Registration" />
        <div className="content-panel flex-1">
          <div className="max-w-xl mx-auto py-12">
            {loading ? (
              <p className="font-display text-xl text-text-muted text-center">Loading...</p>
            ) : !userData ? (
              <p className="font-display text-xl text-text-muted text-center">No registration data found.</p>
            ) : (
              <div className="bg-white border border-cream-dark border-t-[3px] border-t-secondary-color p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="overline mb-1">Registrant</p>
                    <h2 className="font-display font-semibold text-3xl text-text-dark">
                      {userData.first_name} {userData.last_name}
                    </h2>
                  </div>
                  <span className={`font-sans text-[0.68rem] tracking-[0.15em] uppercase font-bold px-3 py-1.5 border rounded ${
                    userData.paid
                      ? 'text-green-800 border-green-700 bg-green-50'
                      : 'text-amber-800 border-amber-500 bg-amber-50'
                  }`}>
                    {userData.paid ? 'Paid' : 'Unpaid'}
                  </span>
                </div>

                <div className="w-10 h-px bg-secondary-color mb-6" />

                <div className="space-y-4">
                  <div className="flex justify-between border-b border-cream-dark pb-3">
                    <span className="overline pt-0.5">Shirt Size</span>
                    <span className="font-display text-text-dark text-xl">{userData.shirt.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between border-b border-cream-dark pb-3">
                    <span className="overline pt-0.5">Friday Afternoon</span>
                    <span className="font-display text-text-dark text-xl">{userData.friday ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between border-b border-cream-dark pb-3">
                    <span className="overline pt-0.5">Monday</span>
                    <span className="font-display text-text-dark text-xl">{userData.monday ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between pb-3">
                    <span className="overline pt-0.5">Registration</span>
                    <span className="font-display text-text-dark text-xl">
                      {userData.registered ? 'Confirmed' : 'Incomplete'}
                    </span>
                  </div>
                </div>

                {!userData.paid && (
                  <div className="text-center mt-8">
                    <button onClick={() => navigate('/payment')} className="btn-gold">
                      Proceed to Payment
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </SignedIn>
    </>
  );
};

export default Details;
