import { useState } from 'react';
import { useAuth } from './useAuth';

export const useImage = () => {
    const { token } = useAuth();
    const API_URL = 'http://localhost:3000/api';
    const [uploading, setUploading] = useState(false);

    const uploadImage = async (file) => {
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await fetch(`${API_URL}/image/upload`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to upload image');
            return data;
        } catch (error) {
            throw error;
        } finally {
            setUploading(false);
        }
    };

    return { uploadImage, uploading };
};
