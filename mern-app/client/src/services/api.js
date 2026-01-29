import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  monkLogin: (data) => api.post('/monks/login', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => {
    return api.put('/auth/profile', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  getAllUsers: () => api.get('/auth/users'),
  deleteUser: (userId) => api.delete(`/auth/users/${userId}`),
  createMonk: (data) => api.post('/auth/create-monk', data)
};

// Event APIs
export const eventAPI = {
  getAllEvents: (params) => api.get('/events', { params }),
  getEvent: (id) => api.get(`/events/${id}`),
  createEvent: (formData) => api.post('/events', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateEvent: (id, formData) => api.put(`/events/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteEvent: (id) => api.delete(`/events/${id}`)
};

// Story APIs
export const storyAPI = {
  getAllStories: (params) => api.get('/stories', { params }),
  getMyStories: () => api.get('/stories/my-stories'),
  createStory: (formData) => api.post('/stories', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  moderateStory: (id, data) => api.put(`/stories/${id}/moderate`, data),
  deleteStory: (id) => api.delete(`/stories/${id}`),
  incrementViews: (id) => api.put(`/stories/${id}/view`)
};

// Itinerary APIs
export const itineraryAPI = {
  generateItinerary: (data) => api.post('/itinerary/generate', data),
  searchItineraries: (params) => api.get('/itinerary/search', { params }),
  getMyItineraries: () => api.get('/itinerary/my-itineraries'),
  getItinerary: (id) => api.get(`/itinerary/${id}`),
  deleteItinerary: (id) => api.delete(`/itinerary/${id}`)
};

// Chatbot APIs
export const chatbotAPI = {
  chat: (data) => api.post('/chatbot/chat', data),
  analyzeImage: (formData) => api.post('/chatbot/analyze-image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
};

// Analytics APIs
export const analyticsAPI = {
  getDashboardStats: () => api.get('/analytics/dashboard'),
  getUserStats: () => api.get('/analytics/user-stats')
};

// Monk APIs
export const monkAPI = {
  getAllMonks: () => api.get('/monks'),
  getMonkById: (id) => api.get(`/monks/${id}`),
  getMonkPosts: (id) => api.get(`/monks/${id}/posts`),
  createMonk: (data) => api.post('/monks', data),
  updateMonk: (id, data) => api.put(`/monks/${id}`, data),
  updateMonkProfile: (formData) => api.put('/monks/profile', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteMonk: (id) => api.delete(`/monks/${id}`),
  monkLogin: (data) => api.post('/monks/login', data)
};

// Monk Post APIs
export const monkPostAPI = {
  getAllMonkPosts: (params) => api.get('/monk-posts', { params }),
  getMonkPostById: (id) => api.get(`/monk-posts/${id}`),
  createMonkPost: (data) => api.post('/monk-posts', data),
  updateMonkPost: (id, data) => api.put(`/monk-posts/${id}`, data),
  deleteMonkPost: (id) => api.delete(`/monk-posts/${id}`),
  likeMonkPost: (id, userId) => api.post(`/monk-posts/${id}/like`, { userId })
};

// Education APIs
export const educationAPI = {
  getAllCategories: () => api.get('/education/categories'),
  getContent: (params) => api.get('/education/content', { params }),
  getRandomContent: (params) => api.get('/education/random', { params }),
  createCategory: (data) => api.post('/education/categories', data),
  createContent: (formData) => api.post('/education/content', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateContent: (id, formData) => api.put(`/education/content/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteContent: (id) => api.delete(`/education/content/${id}`)
};

export default api;
