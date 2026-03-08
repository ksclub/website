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

// Enrollment API
export const enrollmentApi = {
  create: (token: string, data: { courseId: string; period: string; price: number; emailTime: string }) =>
    fetchApi<{ message: string; enrollment: Enrollment }>('/enrollments', {
      method: 'POST',
      body: data,
      token,
    }),

  getMyEnrollments: (token: string) =>
    fetchApi<{ enrollments: Enrollment[] }>('/enrollments/my', { token }),

  getById: (token: string, id: string) =>
    fetchApi<{ enrollment: Enrollment }>(`/enrollments/${id}`, { token }),
};

// Payment API
export const paymentApi = {
  createOrder: (token: string, enrollmentId: string) =>
    fetchApi<{ message: string; payment: Payment; approvalUrl: string; orderId: string }>(
      '/payments/create-order',
      {
        method: 'POST',
        body: { enrollmentId },
        token,
      }
    ),

  captureOrder: (token: string, orderId: string) =>
    fetchApi<{ message: string; payment: Payment }>('/payments/capture', {
      method: 'POST',
      body: { orderId },
      token,
    }),
};

// Admin API
export const adminApi = {
  getDashboard: (token: string) =>
    fetchApi<{ stats: DashboardStats }>('/admin/dashboard', { token }),

  // Users
  getUsers: (token: string, page = 1, limit = 20, search?: string) => {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (search) params.append('search', search);
    return fetchApi<{ users: AdminUser[]; pagination: Pagination }>(`/admin/users?${params}`, { token });
  },

  blockUser: (token: string, userId: string) =>
    fetchApi<{ message: string; user: AdminUser }>(`/admin/users/${userId}/block`, {
      method: 'PUT',
      token,
    }),

  unblockUser: (token: string, userId: string) =>
    fetchApi<{ message: string; user: AdminUser }>(`/admin/users/${userId}/unblock`, {
      method: 'PUT',
      token,
    }),

  // Posts
  getPosts: (token: string, page = 1, limit = 20) =>
    fetchApi<{ posts: Post[]; pagination: Pagination }>(`/admin/posts?page=${page}&limit=${limit}`, { token }),

  deletePost: (token: string, postId: string) =>
    fetchApi<{ message: string }>(`/admin/posts/${postId}`, {
      method: 'DELETE',
      token,
    }),

  // Notices
  getNotices: (token: string, page = 1, limit = 20) =>
    fetchApi<{ notices: Notice[]; pagination: Pagination }>(`/admin/notices?page=${page}&limit=${limit}`, { token }),

  createNotice: (token: string, data: { title: string; content: string; important?: boolean }) =>
    fetchApi<{ message: string; notice: Notice }>('/admin/notices', {
      method: 'POST',
      body: data,
      token,
    }),

  updateNotice: (token: string, noticeId: string, data: { title?: string; content?: string; important?: boolean }) =>
    fetchApi<{ message: string; notice: Notice }>(`/admin/notices/${noticeId}`, {
      method: 'PUT',
      body: data,
      token,
    }),

  deleteNotice: (token: string, noticeId: string) =>
    fetchApi<{ message: string }>(`/admin/notices/${noticeId}`, {
      method: 'DELETE',
      token,
    }),

  // Enrollments
  getEnrollments: (token: string, page = 1, limit = 20) =>
    fetchApi<{ enrollments: Enrollment[]; pagination: Pagination }>(`/enrollments?page=${page}&limit=${limit}`, { token }),

  updateEnrollmentStatus: (token: string, enrollmentId: string, status: string) =>
    fetchApi<{ message: string; enrollment: Enrollment }>(`/enrollments/${enrollmentId}/status`, {
      method: 'PUT',
      body: { status },
      token,
    }),

  // Courses (using existing courseApi for admin)
  createCourse: (token: string, data: Partial<Course>) =>
    fetchApi<{ message: string; course: Course }>('/courses', {
      method: 'POST',
      body: data,
      token,
    }),

  updateCourse: (token: string, courseId: string, data: Partial<Course>) =>
    fetchApi<{ message: string; course: Course }>(`/courses/${courseId}`, {
      method: 'PUT',
      body: data,
      token,
    }),

  deleteCourse: (token: string, courseId: string) =>
    fetchApi<{ message: string }>(`/courses/${courseId}`, {
      method: 'DELETE',
      token,
    }),
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
  sourceUrl?: string;
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

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  period: string;
  price: number;
  emailTime: string;
  status: 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED' | 'REFUNDED';
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
  course?: Course;
  payment?: Payment;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface Payment {
  id: string;
  enrollmentId: string;
  paypalOrderId: string;
  paypalPayerId?: string;
  amount: number;
  currency: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUser extends User {
  isBlocked: boolean;
  blockedAt?: string;
  _count?: {
    posts: number;
    enrollments: number;
  };
}

export interface DashboardStats {
  totalUsers: number;
  totalCourses: number;
  totalEnrollments: number;
  totalRevenue: number;
  activeEnrollments: number;
  pendingEnrollments: number;
  recentEnrollments: Enrollment[];
  monthlyRevenue: { month: string; revenue: number }[];
}
