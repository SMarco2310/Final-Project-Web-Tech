import { useCallback } from 'react';
import { useAuth } from './useAuth';

export const useMessage = () => {
    const { token } = useAuth();
    const API_URL = import.meta.env.VITE_API_URL;

    const sendMessage = async (chatId, content) => {
        try {
            const response = await fetch(`${API_URL}/api/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ chatId, content })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to send message');
            return data;
        } catch (error) {
            throw error;
        }
    };

    const getMessages = useCallback(async (chatId) => {
        try {
            const response = await fetch(`${API_URL}/messages/${chatId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to fetch messages');
            return data;
        } catch (error) {
            throw error;
        }
    }, [token]);

    const markAsRead = async (chatId) => {
        try {
            const response = await fetch(`${API_URL}/messages/${chatId}/read`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to mark messages as read');
            return data;
        } catch (error) {
            throw error;
        }
    };

    return { sendMessage, getMessages, markAsRead };
};
