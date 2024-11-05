export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";
export const USERS_ENDPOINT = `${API_BASE_URL}/api/users`;
export const ALL_USERS_ENDPOINT = `${API_BASE_URL}/api/users/all`;
export const POSTS_ENDPOINT = `${API_BASE_URL}/api/posts`;
export const POSTS_ALL_ENDPOINT = `${API_BASE_URL}/api/posts/all`;
export const AUTH_ENDPOINT = `${API_BASE_URL}/api/auth/login`;
export const AUTH_REGISTER_ENDPOINT = `${API_BASE_URL}/api/auth/register`;
