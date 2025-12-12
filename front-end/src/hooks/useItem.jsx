import { useCallback } from 'react';
import { useAuth } from './useAuth';

export const useItem = () => {
    const { token } = useAuth();
    const API_URL = 'http://localhost:4000/api';

    const getAllItems = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/item/items`);
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to fetch items');
            return data;
        } catch (error) {
            throw error;
        }
    }, []);

    const getItemById = useCallback(async (id) => {
        try {
            const response = await fetch(`${API_URL}/item/item/${id}`);
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to fetch item');
            return data;
        } catch (error) {
            throw error;
        }
    }, []);

    const createItem = async (itemData) => {
        try {
            const response = await fetch(`${API_URL}/item/item`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(itemData)
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to create item');
            return data;
        } catch (error) {
            throw error;
        }
    };

    const deleteItem = async (id) => {
        try {
            const response = await fetch(`${API_URL}/item/item/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to delete item');
            return data;
        } catch (error) {
            throw error;
        }
    };

    return { getAllItems, getItemById, createItem, deleteItem };
};
