import React from 'react';
import { SignUp, SignedIn, SignedOut } from '@clerk/clerk-react';
import PageHeader from '../components/PageHeader';
import RegistrationForm from '../components/RegistrationForm';

const clerkAppearance = {
  elements: {
    rootBox: { width: '100%', maxWidth: '100%' },
    card: { width: '100%', maxWidth: '100%', boxShadow: 'none' },
    cardBox: { width: '100%', maxWidth: '100%', boxShadow: 'none' },
  },
};

const Register: React.FC = () => {
  return (
    <>
      <PageHeader annualNumber={6} title="Registration" />
      <div className="content-panel">
        <div className="max-w-md mx-auto px-2 sm:px-6 py-12 overflow-hidden">
          <SignedOut>
            <p className="font-display text-xl text-text-dark text-center mb-8">
              Create an account or sign in to register for the tournament.
            </p>
            <div className="w-full max-w-full overflow-hidden">
              <SignUp forceRedirectUrl='/register' appearance={clerkAppearance} />
            </div>
          </SignedOut>
          <SignedIn>
            <RegistrationForm />
          </SignedIn>
        </div>
      </div>
    </>
  );
};

export default Register;
