import React, { useEffect } from 'react';
import { useUser, SignIn } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const { isSignedIn } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSignedIn) {
            navigate('/details');
        }
    }, [isSignedIn, navigate]);

    return isSignedIn ? null : (
        <div className="content-panel py-12">
            <div className="flex justify-center">
                <SignIn forceRedirectUrl='/details' />
            </div>
        </div>
    );
};

export default Login;
