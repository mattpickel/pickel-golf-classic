import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUser as useClerkUser } from '@clerk/clerk-react';

// Define the shape of the user object
interface User {
    id: string;
    firstName?: string;
    lastName?: string;
    // Add other user fields as needed
}

// Define the shape of the context value
interface UserContextValue {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Create a context with a default value of undefined
const UserContext = createContext<UserContextValue | undefined>(undefined);

// Define props for the UserProvider
interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const { user: clerkUser } = useClerkUser();

    // Fetch the user data when the component mounts
    useEffect(() => {
        if (clerkUser) {
            const fetchUser = async () => {
                const userData = {
                    id: clerkUser.id,
                    firstName: clerkUser.firstName || undefined,
                    lastName: clerkUser.lastName || undefined,
                };
                setUser(userData);
            };

            fetchUser();
        }
    }, [clerkUser]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
