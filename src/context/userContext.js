import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:3000/userProfile', {
                    method: "GET",
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Unauthorized or session expired');
                }

                const data = await response.json();
                setUser(data.user);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            };
        };

        fetchUserData();
    }, [])
    
    return (
        <UserContext.Provider value={{ user, loading, error }}>
            {children}
        </UserContext.Provider>
    )
}