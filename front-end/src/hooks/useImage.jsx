import { useState } from 'react';
import { useAuth } from './useAuth';

export const useImage = () => {
    const { token } = useAuth();
    const API_URL = import.meta.env.VITE_API_URL;
    const [uploading, setUploading] = useState(false);

    const uploadImage = async (file) => {
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await fetch(`${API_URL}/api/image/upload`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            let data;
            const responseText = await response.text();

            try {
                data = JSON.parse(responseText);
            } catch (e) {
                console.error("Failed to parse response JSON:", responseText);
                throw new Error(`Upload failed (${response.status}): Server returned non-JSON response`);
            }

            if (!response.ok) {
                console.error("Upload failed response:", data);
                throw new Error(data.message || data.error || `Failed to upload image (${response.status})`);
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