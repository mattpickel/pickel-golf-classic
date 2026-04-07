import React from 'react';
import { SignUp, SignedIn, SignedOut } from '@clerk/clerk-react';
import PageHeader from '../components/PageHeader';
import { useNavigate } from 'react-router-dom';

const Payment: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader annualNumber={6} title="Payment" />
      <div className="content-panel">
        <div className="max-w-xl mx-auto px-6 py-12">
          <SignedOut>
            <div className="flex justify-center">
              <SignUp path="/sign-up" routing="path" />
            </div>
          </SignedOut>
          <SignedIn>
            <div className="bg-white border border-cream-dark p-8 text-center">
              <p className="overline mb-1">Almost There</p>
              <h2 className="font-display font-semibold text-3xl text-text-dark mb-2">Complete Your Payment</h2>
              <div className="w-10 h-px bg-secondary-color my-4 mx-auto" />

              <p className="font-display text-xl text-text-mid mb-6">
                Thank you for submitting your registration details! To complete your registration,
                please pay Donnie Pickel on Venmo. Please allow 48 hours for your payment status to update.
              </p>

              <img src="/images/image0.png" alt="Venmo QR code" className="mx-auto mb-6 max-w-[220px]" />

              <a href="https://venmo.com/u/Donnie-Pickel"
                 className="font-sans text-sm tracking-wide text-secondary-color hover:text-gold-dark underline underline-offset-4 transition-colors block mb-6">
                OPEN VENMO PROFILE
              </a>

              <button className="btn-gold" onClick={() => navigate('/details')}>
                View My Registration
              </button>
            </div>
          </SignedIn>
        </div>
      </div>
    </>
  );
};

export default Payment;
