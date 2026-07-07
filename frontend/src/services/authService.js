import api from './api';

export async function register(name, email, password) {
  const { data } = await api.post('/auth/register', { name, email, password });
  return data.data;
}

export async function login(email, password) {
  const { data } = await api.post('/auth/login', { email, password });
  return data.data;
}

export async function logout() {
  const { data } = await api.post('/auth/logout');
  return data;
}

export async function getMe() {
  const { data } = await api.get('/auth/me');
  return data.data.user;
}

export async function updateProfile(name) {
  const { data } = await api.put('/profile', { name });
  return data.data.user;
}

export async function changePassword(currentPassword, newPassword) {
  const { data } = await api.put('/profile/password', { currentPassword, newPassword });
  return data;
}
