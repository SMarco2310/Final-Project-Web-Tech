import { useState } from 'react';
import { useAuth } from './useAuth';

export const useImage = () => {
    const { token } = useAuth();
    const API_URL = 'http://localhost:4000/api'; 
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

            if (!response.ok) {
                throw new Error(data.message || data.error || 'Failed to upload image');
            }

            return data.imageUrl; 
        } catch (error) {
            console.error("Upload hook error:", error);
            throw error;
        } finally {
            setUploading(false);
        }
    };

    return { uploadImage, uploading };
};