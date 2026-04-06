import React, { useEffect } from 'react';
import { useUser, SignIn } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const { isSignedIn } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect if the user is already signed in
        if (isSignedIn) {
            navigate('/details');
        }
    }, [isSignedIn, navigate]);  

    // Show the SignIn component if not logged in
    return isSignedIn ? null : (
        <div className='mx-auto'>
            <SignIn forceRedirectUrl='/details' />;  
        </div>
    );
};

export default Login;
