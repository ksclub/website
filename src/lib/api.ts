const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

interface ApiOptions {
  method?: string;
  body?: unknown;
  token?: string;
}

async function fetchApi<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const { method = 'GET', body, token } = options;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'An error occurred');
  }

  return data;
}

// Auth API
export const authApi = {
  register: (email: string, password: string, name: string) =>
    fetchApi<{ message: string; user: User }>('/auth/register', {
      method: 'POST',
      body: { email, password, name },
    }),

  login: (email: string, password: string) =>
    fetchApi<{ message: string; user: User; token: string }>('/auth/login', {
      method: 'POST',
      body: { email, password },
    }),

  getProfile: (token: string) =>
    fetchApi<{ user: User }>('/auth/profile', { token }),

  updateProfile: (token: string, name: string) =>
    fetchApi<{ message: string; user: User }>('/auth/profile', {
      method: 'PUT',
      body: { name },
      token,
    }),
};

// Notice API
export const noticeApi = {
  getAll: (page = 1, limit = 10) =>
    fetchApi<{ notices: Notice[]; pagination: Pagination }>(`/notices?page=${page}&limit=${limit}`),

  getById: (id: string) =>
    fetchApi<{ notice: Notice }>(`/notices/${id}`),
};

// Post API
export const postApi = {
  getAll: (category?: string, page = 1, limit = 10, token?: string) => {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (category) params.append('category', category);
    return fetchApi<{ posts: Post[]; pagination: Pagination }>(`/posts?${params}`, { token });
  },

  getById: (id: string, token?: string) =>
    fetchApi<{ post: Post }>(`/posts/${id}`, { token }),

  getTopPosts: (category: string, limit = 5) =>
    fetchApi<{ posts: Post[] }>(`/posts/top?category=${category}&limit=${limit}`),

  create: (token: string, data: { title: string; content: string; category: string; excerpt?: string; thumbnail?: string }) =>
    fetchApi<{ message: string; post: Post }>('/posts', {
      method: 'POST',
      body: data,
      token,
    }),

  toggleLike: (token: string, postId: string) =>
    fetchApi<{ liked: boolean }>(`/posts/${postId}/like`, {
      method: 'POST',
      token,
    }),

  update: (token: string, postId: string, data: { title?: string; content?: string; excerpt?: string; thumbnail?: string }) =>
    fetchApi<{ message: string; post: Post }>(`/posts/${postId}`, {
      method: 'PUT',
      body: data,
      token,
    }),

  delete: (token: string, postId: string) =>
    fetchApi<{ message: string }>(`/posts/${postId}`, {
      method: 'DELETE',
      token,
    }),

  getMyPosts: (token: string, page = 1, limit = 10) =>
    fetchApi<{ posts: Post[]; pagination: Pagination }>(`/posts/my?page=${page}&limit=${limit}`, { token }),
};

// Contact API
export const contactApi = {
  create: (data: { name: string; email: string; subject: string; message: string }, token?: string) =>
    fetchApi<{ message: string; contact: Contact }>('/contacts', {
      method: 'POST',
      body: data,
      token,
    }),
};

// Course API
export const courseApi = {
  getAll: (isOpen?: boolean) => {
    const params = isOpen !== undefined ? `?isOpen=${isOpen}` : '';
    return fetchApi<{ courses: Course[] }>(`/courses${params}`);
  },

  getById: (id: string) =>
    fetchApi<{ course: Course }>(`/courses/${id}`),
};

// Upload API
export const uploadApi = {
  uploadImage: async (token: string, file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${API_URL}/upload/image`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to upload image');
    }

    return data.url;
  },
};

// Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
  updatedAt: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  important: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  thumbnail?: string;
  category: string;
  views: number;
  createdAt: string;
  author: {
    id: string;
    name: string;
  };
  _count: {
    comments: number;
    likes: number;
  };
  isLiked?: boolean;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

export interface Course {
  id: string;
  title: string;
  level: string;
  description: string;
  duration: string;
  lessons: number;
  price: number;
  features: string[];
  isOpen: boolean;
  isPopular: boolean;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
