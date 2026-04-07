import React from 'react';
import { SignUp, SignedIn, SignedOut } from '@clerk/clerk-react';
import PageHeader from '../components/PageHeader';
import RegistrationForm from '../components/RegistrationForm';

const Register: React.FC = () => {
  return (
    <>
      <PageHeader annualNumber={6} title="Registration" />
      <div className="content-panel">
        <div className="max-w-xl mx-auto px-6 py-12">
          <SignedOut>
            <p className="font-display text-xl text-text-dark text-center mb-8">
              Create an account or sign in to register for the tournament.
            </p>
            <div className="flex justify-center">
              <SignUp forceRedirectUrl='/register' />
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
