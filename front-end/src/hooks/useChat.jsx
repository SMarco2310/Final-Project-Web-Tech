import { useCallback } from 'react';
import { useAuth } from './useAuth';

export const useChat = () => {
    const { token } = useAuth();
    const API_URL = 'http://localhost:3000/api';

    const createChat = async (itemId, otherUserId) => {
        try {
            const response = await fetch(`${API_URL}/chats`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ itemId, otherUserId })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to create chat');
            return data;
        } catch (error) {
            throw error;
        }
    };

    const getUserChats = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/chats`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to fetch chats');
            return data;
        } catch (error) {
            throw error;
        }
    }, [token]);

    const getChatDetails = useCallback(async (chatId) => {
        try {
            const response = await fetch(`${API_URL}/chats/${chatId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to fetch chat details');
            return data;
        } catch (error) {
            throw error;
        }
    }, [token]);

    return { createChat, getUserChats, getChatDetails };
};
