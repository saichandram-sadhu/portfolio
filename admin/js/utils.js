/**
 * Utility Functions
 */

/**
 * Toast Notification System
 */
class Toast {
    static show(message, type = 'success', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 ${
            type === 'success' ? 'bg-green-500 text-white' :
            type === 'error' ? 'bg-red-500 text-white' :
            type === 'warning' ? 'bg-yellow-500 text-white' :
            'bg-blue-500 text-white'
        }`;
        toast.textContent = message;
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(0)';
        }, 10);
        
        // Animate out and remove
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
}

/**
 * Image Upload Handler
 * Supports both Cloudflare Images and base64 encoding
 */
class ImageUploader {
    static async uploadToCloudflare(file, cloudflareAccountId, cloudflareToken) {
        try {
            // First, get upload URL
            const uploadResponse = await fetch(
                `https://api.cloudflare.com/client/v4/accounts/${cloudflareAccountId}/images/v2/direct_upload`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${cloudflareToken}`
                    }
                }
            );

            if (!uploadResponse.ok) {
                throw new Error('Failed to get upload URL');
            }

            const uploadData = await uploadResponse.json();
            const uploadURL = uploadData.result.uploadURL;

            // Upload file
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(uploadURL, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to upload image');
            }

            const data = await response.json();
            return data.result.variants[0]; // Return the first variant URL
        } catch (error) {
            console.error('Cloudflare upload error:', error);
            throw error;
        }
    }

    static async toBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    static async upload(file, options = {}) {
        const { useCloudflare = false, cloudflareAccountId, cloudflareToken } = options;

        if (useCloudflare && cloudflareAccountId && cloudflareToken) {
            try {
                return await this.uploadToCloudflare(file, cloudflareAccountId, cloudflareToken);
            } catch (error) {
                console.warn('Cloudflare upload failed, falling back to base64:', error);
            }
        }

        // Fallback to base64
        return await this.toBase64(file);
    }
}

/**
 * Format date
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

/**
 * Generate unique ID
 */
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Debounce function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Load JSON data
 */
async function loadJSON(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to load ${filePath}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error loading ${filePath}:`, error);
        return null;
    }
}

// Export to window
window.Toast = Toast;
window.ImageUploader = ImageUploader;
window.formatDate = formatDate;
window.generateId = generateId;
window.debounce = debounce;
window.loadJSON = loadJSON;
