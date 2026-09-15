import axios from 'axios';

// 1. Dành cho các component sử dụng fetch
export const fetchWithAuth = async (url, options = {}) => {
  let token = localStorage.getItem('accessToken');
  
  const headers = {
    ...options.headers,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  let response = await fetch(url, {
    ...options,
    headers,
  });

  // Nếu gặp lỗi 401 Unauthorized (token hết hạn)
  if (response.status === 401 || response.status === 403) {
    try {
      // Gọi API refresh token
      const refreshResponse = await fetch('/api/v1/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (refreshResponse.ok) {
        const refreshData = await refreshResponse.json();
        if (refreshData.code === 200 && refreshData.data.accessToken) {
          // Lưu token mới
          const newToken = refreshData.data.accessToken;
          localStorage.setItem('accessToken', newToken);
          if (refreshData.data.fullName) localStorage.setItem('fullName', refreshData.data.fullName);
          if (refreshData.data.avatarUrl) localStorage.setItem('avatarUrl', refreshData.data.avatarUrl);
          if (refreshData.data.role) localStorage.setItem('role', refreshData.data.role);
          
          // Thử gọi lại API ban đầu với token mới
          headers['Authorization'] = `Bearer ${newToken}`;
          response = await fetch(url, {
            ...options,
            headers,
          });
        } else {
          throw new Error('Refresh token failed');
        }
      } else {
         throw new Error('Refresh token failed');
      }
    } catch (error) {
      // Đăng xuất nếu không thể refresh token
      localStorage.removeItem('accessToken');
      localStorage.removeItem('fullName');
      localStorage.removeItem('avatarUrl');
      localStorage.removeItem('role');
      window.location.href = '/login';
    }
  }

  return response;
};

// 2. Dành cho các component sử dụng axios
const axiosInstance = axios.create();

// Thêm token vào mỗi request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Bắt lỗi 401 để tự động refresh token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && (error.response.status === 401 || error.response.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post('/api/v1/auth/refresh', {}, { withCredentials: true });
        
        if (refreshResponse.status === 200 && refreshResponse.data.code === 200) {
          const newToken = refreshResponse.data.data.accessToken;
          localStorage.setItem('accessToken', newToken);
          if (refreshResponse.data.data.fullName) localStorage.setItem('fullName', refreshResponse.data.data.fullName);
          if (refreshResponse.data.data.avatarUrl) localStorage.setItem('avatarUrl', refreshResponse.data.data.avatarUrl);
          if (refreshResponse.data.data.role) localStorage.setItem('role', refreshResponse.data.data.role);
          
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('fullName');
        localStorage.removeItem('avatarUrl');
        localStorage.removeItem('role');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
