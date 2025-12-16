import { useCallback } from 'react';
import { useAuth } from './useAuth';

export const useChat = () => {
    const { token } = useAuth();
    const API_URL = 'http://localhost:4000/api';

    const getUserChats = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/chats`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to fetch chats');
            return data;
        } catch (error) {
            throw error;
        }
    }, [token]);

    const getChatDetails = useCallback(async (id) => {
        try {
            const response = await fetch(`${API_URL}/chats/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to fetch chat details');
            return data;
        } catch (error) {
            throw error;
        }
    }, [token]);

    const getMessages = useCallback(async (chatId) => {
        try {
            const response = await fetch(`${API_URL}/messages/${chatId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to fetch messages');
            return data;
        } catch (error) {
            throw error;
        }
    }, [token]);

    const sendMessage = async (chatId, content) => {
        try {
            const response = await fetch(`${API_URL}/messages`, {
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

    const createChat = async (otherUserId, itemId = null) => {
        try {
            const response = await fetch(`${API_URL}/chats`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ otherUserId, itemId })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to create chat');
            return data;
        } catch (error) {
            throw error;
        }
    };

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

    const getUnreadCount = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/messages/unread/count`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to fetch unread count');
            return data.count;
        } catch (error) {
            throw error;
        }
    }, [token]);

    return { getUserChats, getChatDetails, getMessages, sendMessage, markAsRead, createChat, getUnreadCount };
};
