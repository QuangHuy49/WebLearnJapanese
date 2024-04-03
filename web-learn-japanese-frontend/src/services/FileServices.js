import axios from "axios";

export const handleUploadImage = async (file, handleProgress) => {
    try {
        const formData = new FormData();
        formData.append('add_image', file);
        const response = await axios.post('http://127.0.0.1:8000/api/upload/image', formData, {
            onUploadProgress: (progressEvent) => {
                const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                handleProgress(progress);
            },
        });
        return response;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

export const handleDeleteImage = async (imageName) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/delete/image', {
            imageName: imageName
        });

        if (response.status === 200) { 
            return { success: true };
        } else {
            return { success: false, error: 'Error deleting image' };
        }
    } catch (error) {
        console.error('Error deleting image:', error);
        return { success: false, error: error.message };
    }
};

export const handleUploadAudio = async (file, handleProgress) => {
    try {
        const formData = new FormData();
        formData.append('add_audio', file);
        const response = await axios.post('http://127.0.0.1:8000/api/upload/audio', formData, {
            onUploadProgress: (progressEvent) => {
                const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                handleProgress(progress);
            },
        });
        return response;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

export const handleDeleteAudio = async (audioName) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/delete/audio', {
            audioName: audioName
        });

        if (response.status === 200) { 
            return { success: true };
        } else {
            return { success: false, error: 'Error deleting audio' };
        }
    } catch (error) {
        console.error('Error deleting audio:', error);
        return { success: false, error: error.message };
    }
};
