const API_BASE_URL = 'http://localhost:3001';  // Adjust as necessary for your API server

export const createUserInDB = async (clerkUserId) => {
    const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clerkUserId })
    });
    return response.json();
};

export const updateUserDetails = async (userId, additionalInfo) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(additionalInfo)
    });
    return response.json();
};

export const fetchUserDetails = async (userId) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`);
    return response.json();
};
