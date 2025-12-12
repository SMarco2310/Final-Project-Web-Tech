import { useState } from 'react';
import { useAuth } from './useAuth';

export const useDescriptionAi = () => {
    const { token } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const API_URL = 'http://localhost:3000/api';

    const generateDescription = async (imageUrl) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/ai/describe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ imageUrl })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to generate description');
            }

            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { generateDescription, loading, error };
};