import { useCallback } from 'react';
import { useAuth } from './useAuth';

export const useClaim = () => {
    const { token } = useAuth();
    const API_URL = 'http://localhost:4000/api';

    const createClaim = async (itemId) => {
        try {
            const response = await fetch(`${API_URL}/claims`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ itemId })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to create claim');
            return data;
        } catch (error) {
            throw error;
        }
    };

    const getClaims = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/claims`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to fetch claims');
            return data;
        } catch (error) {
            throw error;
        }
    }, [token]);

    const updateClaimStatus = async (claimId, status) => {
        try {
            const response = await fetch(`${API_URL}/claims/${claimId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to update claim status');
            return data;
        } catch (error) {
            throw error;
        }
    };

    return { createClaim, getClaims, updateClaimStatus };
};
