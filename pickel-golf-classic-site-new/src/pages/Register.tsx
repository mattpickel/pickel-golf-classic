import React from 'react';
import { SignUp, SignedIn, SignedOut } from '@clerk/clerk-react';
import RegistrationForm from '../components/RegistrationForm';

const Register: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <SignedOut>
        <SignUp forceRedirectUrl='/info' />
      </SignedOut>
      <SignedIn>
        <RegistrationForm />
      </SignedIn>
    </div>
  );
};

export default Register;
