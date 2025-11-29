# Frontend Integration Guide

Complete examples for replacing JSON file reads/writes with API calls.

## API Base URL

```javascript
const API_BASE = 'https://your-service.onrender.com/api';
```

## Blog Posts

### Load All Posts
```javascript
// Old: fetch('/data/blog.json')
// New:
async function loadBlogPosts() {
    const response = await fetch(`${API_BASE}/blog/`);
    const data = await response.json();
    return data;
}
```

### Load Single Post
```javascript
async function loadBlogPost(slug) {
    const response = await fetch(`${API_BASE}/blog/${slug}/`);
    return await response.json();
}
```

### Create Post
```javascript
async function createBlogPost(postData) {
    const response = await fetch(`${API_BASE}/blog/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}` // If using auth
        },
        body: JSON.stringify({
            title: postData.title,
            slug: postData.slug,
            excerpt: postData.excerpt,
            content: postData.content,
            date: postData.date,
            read_time: postData.readTime,
            published: postData.status === 'published'
        })
    });
    return await response.json();
}
```

### Update Post
```javascript
async function updateBlogPost(slug, postData) {
    const response = await fetch(`${API_BASE}/blog/${slug}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
            title: postData.title,
            excerpt: postData.excerpt,
            content: postData.content,
            date: postData.date,
            read_time: postData.readTime,
            published: postData.status === 'published'
        })
    });
    return await response.json();
}
```

### Delete Post
```javascript
async function deleteBlogPost(slug) {
    const response = await fetch(`${API_BASE}/blog/${slug}/`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    });
    return response.ok;
}
```

## Projects

### Load All Projects
```javascript
async function loadProjects() {
    const response = await fetch(`${API_BASE}/projects/`);
    return await response.json();
}
```

### Create Project
```javascript
async function createProject(projectData) {
    const response = await fetch(`${API_BASE}/projects/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
            id: projectData.id || `project-${Date.now()}`,
            title: projectData.title,
            description: projectData.description,
            image: projectData.image,
            tags: projectData.tags || [],
            link: projectData.link || '',
            github: projectData.github || ''
        })
    });
    return await response.json();
}
```

## Testimonials

### Load All Testimonials
```javascript
async function loadTestimonials() {
    const response = await fetch(`${API_BASE}/testimonials/`);
    return await response.json();
}
```

### Create Testimonial
```javascript
async function createTestimonial(testimonialData) {
    const response = await fetch(`${API_BASE}/testimonials/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
            id: testimonialData.id || `testimonial-${Date.now()}`,
            name: testimonialData.name,
            role: testimonialData.role,
            company: testimonialData.company || '',
            photo: testimonialData.photo || '',
            text: testimonialData.text,
            rating: testimonialData.rating || 5
        })
    });
    return await response.json();
}
```

## Skills

### Load All Skills
```javascript
async function loadSkills() {
    const response = await fetch(`${API_BASE}/skills/`);
    return await response.json();
}
```

### Create/Update Skill
```javascript
async function saveSkill(skillData) {
    const method = skillData.id ? 'PUT' : 'POST';
    const url = skillData.id 
        ? `${API_BASE}/skills/${skillData.id}/`
        : `${API_BASE}/skills/`;
    
    const response = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
            id: skillData.id || `skill-${Date.now()}`,
            name: skillData.name,
            percent: skillData.percent,
            category: skillData.category || ''
        })
    });
    return await response.json();
}
```

## Messages

### Send Message (Public - No Auth)
```javascript
async function sendMessage(messageData) {
    const response = await fetch(`${API_BASE}/messages/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: messageData.name,
            email: messageData.email,
            subject: messageData.subject || '',
            message: messageData.message
        })
    });
    return await response.json();
}
```

### Load Messages (Requires Auth)
```javascript
async function loadMessages() {
    const response = await fetch(`${API_BASE}/messages/`, {
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    });
    return await response.json();
}
```

## Profile

### Load Profile
```javascript
async function loadProfile() {
    const response = await fetch(`${API_BASE}/profile/`);
    return await response.json();
}
```

### Update Profile
```javascript
async function updateProfile(profileData) {
    const response = await fetch(`${API_BASE}/profile/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
            name: profileData.name,
            title: profileData.title,
            about: profileData.about,
            phone: profileData.phone,
            email: profileData.email,
            avatar: profileData.avatar,
            location: profileData.location,
            social: profileData.social || {}
        })
    });
    return await response.json();
}
```

## SEO Settings

### Load SEO Settings
```javascript
async function loadSEOSettings() {
    const response = await fetch(`${API_BASE}/seo/`);
    return await response.json();
}
```

### Update SEO Settings
```javascript
async function updateSEOSettings(seoData) {
    const response = await fetch(`${API_BASE}/seo/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
            title: seoData.title,
            description: seoData.description,
            og_image: seoData.og_image,
            twitter_image: seoData.twitter_image,
            ga_measurement_id: seoData.ga_measurement_id,
            meta_keywords: seoData.meta_keywords || []
        })
    });
    return await response.json();
}
```

## Complete Admin API Service

Create `admin/js/api-service.js`:

```javascript
class APIService {
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.token = localStorage.getItem('admin_api_token');
    }

    setToken(token) {
        this.token = token;
        localStorage.setItem('admin_api_token', token);
    }

    async request(endpoint, method = 'GET', body = null) {
        const headers = {
            'Content-Type': 'application/json',
        };
        
        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        const options = { method, headers };
        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(`${this.baseURL}${endpoint}`, options);
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    }

    // Blog
    async getBlogPosts() {
        return this.request('/blog/');
    }

    async getBlogPost(slug) {
        return this.request(`/blog/${slug}/`);
    }

    async createBlogPost(data) {
        return this.request('/blog/', 'POST', {
            title: data.title,
            slug: data.slug,
            excerpt: data.excerpt,
            content: data.content,
            date: data.date,
            read_time: data.readTime,
            published: data.status === 'published'
        });
    }

    async updateBlogPost(slug, data) {
        return this.request(`/blog/${slug}/`, 'PUT', {
            title: data.title,
            excerpt: data.excerpt,
            content: data.content,
            date: data.date,
            read_time: data.readTime,
            published: data.status === 'published'
        });
    }

    async deleteBlogPost(slug) {
        return this.request(`/blog/${slug}/`, 'DELETE');
    }

    // Projects
    async getProjects() {
        return this.request('/projects/');
    }

    async createProject(data) {
        return this.request('/projects/', 'POST', {
            id: data.id || `project-${Date.now()}`,
            title: data.title,
            description: data.description,
            image: data.image,
            tags: data.tags || [],
            link: data.link || '',
            github: data.github || ''
        });
    }

    async updateProject(id, data) {
        return this.request(`/projects/${id}/`, 'PUT', data);
    }

    async deleteProject(id) {
        return this.request(`/projects/${id}/`, 'DELETE');
    }

    // Add similar methods for testimonials, skills, messages, profile, seo...
}

// Initialize
const API = new APIService('https://your-service.onrender.com/api');
window.API = API;
```

## Usage in Admin Panel

Replace your existing GitHub API calls:

```javascript
// Old way (GitHub API)
await window.GitHubAPI.saveFile('data/blog.json', posts, 'Update blog');

// New way (Django API)
await API.createBlogPost(postData);
// or
await API.updateBlogPost(slug, postData);
```

