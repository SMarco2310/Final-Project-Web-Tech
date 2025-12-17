import { useCallback } from 'react';
import { useAuth } from './useAuth';

export const useClaim = () => {
    const { token } = useAuth();
    const API_URL = import.meta.env.VITE_API_URL;

    const getMyClaims = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/api/claims/my-claims`, {
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

    const getReceivedClaims = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/api/claims/received`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to fetch received claims');
            return data;
        } catch (error) {
            throw error;
        }
    }, [token]);

    const createClaim = async (claimData) => {
        try {
            const response = await fetch(`${API_URL}/api/claims`, {
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

    const getClaimById = async (id) => {
        try {
            const response = await fetch(`${API_URL}/api/claims/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to fetch claim');
            return data;
        } catch (error) {
            throw error;
        }
    };

    const updateClaimStatus = async (id, status) => {
        try {
            const response = await fetch(`${API_URL}/api/claims/${id}/status`, {
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

    return { getMyClaims, getReceivedClaims, createClaim, getClaimById, updateClaimStatus };
};
