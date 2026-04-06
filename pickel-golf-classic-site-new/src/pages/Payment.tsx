import React from 'react';
import { SignUp, SignedIn, SignedOut } from '@clerk/clerk-react';
import Container from '../components/Container';
import { useNavigate } from 'react-router-dom';

const Payment: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center">
      <SignedOut>
        <SignUp path="/sign-up" routing="path" />
      </SignedOut>
      <SignedIn>
        <Container>
          <h1 className="font-display text-2xl md:text-3xl text-green-900 text-center font-bold mb-2">
            Complete Payment
          </h1>
          <div className="gold-divider mb-5"></div>

          <p className="font-body text-gray-700 mb-5 text-center">
            Thank you for submitting your registration details! To complete your registration,
            please pay Donnie Pickel on Venmo. Please allow 48 hours for your payment status to change.
          </p>

          <div className="flex justify-center mb-5">
            <img src="/images/image0.png" alt="Venmo QR code" className="rounded-lg shadow-md max-w-[250px]" />
          </div>

          <div className="flex flex-col items-center gap-3">
            <a href="https://venmo.com/u/Donnie-Pickel"
               className="font-body text-green-800 hover:text-green-700 underline underline-offset-2 transition-colors">
              Link to Venmo Profile
            </a>
            <button className="btn-primary" onClick={() => navigate('/details')}>
              View My Details
            </button>
          </div>
        </Container>
      </SignedIn>
    </div>
  );
};

export default Payment;
