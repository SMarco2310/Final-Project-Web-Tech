import { useCallback } from 'react';
import { useAuth } from './useAuth';

export const useClaim = () => {
    const { token } = useAuth();
    const API_URL = import.meta.env.VITE_API_URL;

    const getMyClaims = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/claims/my-claims`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to fetch claims');
            return data;
        } catch (error) {
            throw error;
        }
    }, [token]);

    const createClaim = async (claimData) => {
        try {
            const response = await fetch(`${API_URL}/claims`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(claimData)
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to submit claim');
            return data;
        } catch (error) {
            throw error;
        }
    };

    return { getMyClaims, createClaim };
};
