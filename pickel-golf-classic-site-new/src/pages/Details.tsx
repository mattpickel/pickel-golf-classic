import React, { useEffect, useState } from 'react';
import { SignedIn, SignedOut, RedirectToSignIn, useUser as useClerkUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import Container from '../components/Container';

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

  if (loading) {
    return (
      <Container>
        <div className="flex justify-center items-center py-8">
          <p className="font-body text-gray-500">Loading...</p>
        </div>
      </Container>
    );
  }

  if (!userData) {
    return (
      <Container>
        <div className="flex justify-center items-center py-8">
          <p className="font-body text-gray-500">User data not found.</p>
        </div>
      </Container>
    );
  }

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <Container>
          <h1 className="font-display text-2xl md:text-3xl text-green-900 text-center font-bold mb-2">
            My Details
          </h1>
          <div className="gold-divider mb-6"></div>

          <div className="space-y-4 max-w-sm mx-auto">
            <div className="flex justify-between items-baseline border-b border-gray-100 pb-2">
              <span className="font-body font-semibold text-green-900 text-sm">Name</span>
              <span className="font-body text-gray-700">{userData.first_name} {userData.last_name}</span>
            </div>
            <div className="flex justify-between items-baseline border-b border-gray-100 pb-2">
              <span className="font-body font-semibold text-green-900 text-sm">Shirt Size</span>
              <span className="font-body text-gray-700">{userData.shirt.toUpperCase()}</span>
            </div>
            <div className="flex justify-between items-baseline border-b border-gray-100 pb-2">
              <span className="font-body font-semibold text-green-900 text-sm">Friday</span>
              <span className="font-body text-gray-700">{userData.friday ? 'Yes' : 'No'}</span>
            </div>
            <div className="flex justify-between items-baseline border-b border-gray-100 pb-2">
              <span className="font-body font-semibold text-green-900 text-sm">Monday</span>
              <span className="font-body text-gray-700">{userData.monday ? 'Yes' : 'No'}</span>
            </div>
            <div className="flex justify-between items-baseline border-b border-gray-100 pb-2">
              <span className="font-body font-semibold text-green-900 text-sm">Registration</span>
              <span className={`font-body font-medium ${userData.registered ? 'text-green-700' : 'text-amber-600'}`}>
                {userData.registered ? 'Registered' : 'Not Registered'}
              </span>
            </div>
            <div className="flex justify-between items-baseline pb-2">
              <span className="font-body font-semibold text-green-900 text-sm">Payment</span>
              <span className={`font-body font-medium ${userData.paid ? 'text-green-700' : 'text-amber-600'}`}>
                {userData.paid ? 'Paid' : 'Not Paid'}
              </span>
            </div>
          </div>

          {!userData.paid && (
            <div className="flex justify-center mt-6">
              <button onClick={() => navigate('/payment')} className="btn-secondary">
                Proceed to Payment
              </button>
            </div>
          )}
        </Container>
      </SignedIn>
    </>
  );
};

export default Details;
