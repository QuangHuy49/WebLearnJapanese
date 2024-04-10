import React from 'react';

const LoadingUploadFile = () => {
    return (
        <div class="flex items-center justify-center p-5 min-w-screen">
            <div class="flex space-x-2 animate-pulse">
                <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
                <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
                <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
            </div>
        </div>
    );
}

export default LoadingUploadFile;