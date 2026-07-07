import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaUserCircle, FaSave, FaLock } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import * as authService from '../services/authService';

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [savingName, setSavingName] = useState(false);

  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [savingPassword, setSavingPassword] = useState(false);

  const handleNameSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || name.trim().length < 2) {
      toast.error('Name must be at least 2 characters');
      return;
    }
    setSavingName(true);
    try {
      const updated = await authService.updateProfile(name.trim());
      updateUser(updated);
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not update profile');
    } finally {
      setSavingName(false);
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setPasswordErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!passwordForm.currentPassword) errors.currentPassword = 'Enter your current password';
    if (!passwordForm.newPassword || passwordForm.newPassword.length < 6) {
      errors.newPassword = 'New password must be at least 6 characters';
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    setPasswordErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSavingPassword(true);
    try {
      await authService.changePassword(passwordForm.currentPassword, passwordForm.newPassword);
      toast.success('Password changed successfully');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not change password');
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Profile</h1>
        <p className="text-sm text-slate-400">Manage your account details and security.</p>
      </div>

      <div className="card p-6">
        <div className="mb-5 flex items-center gap-3">
          <FaUserCircle className="h-10 w-10 text-brand-500" />
          <div>
            <p className="font-semibold text-slate-800 dark:text-white">{user?.name}</p>
            <p className="text-sm text-slate-400">{user?.email}</p>
          </div>
        </div>

        <form onSubmit={handleNameSubmit} className="space-y-4">
          <div>
            <label className="label-text" htmlFor="name">Full name</label>
            <input
              id="name"
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary" disabled={savingName}>
            <FaSave className="h-4 w-4" /> {savingName ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>

      <div className="card p-6">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
          <FaLock className="h-4 w-4" /> Change Password
        </h3>
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label className="label-text" htmlFor="currentPassword">Current password</label>
            <input
              id="currentPassword"
              name="currentPassword"
              type="password"
              className="input-field"
              value={passwordForm.currentPassword}
              onChange={handlePasswordChange}
            />
            {passwordErrors.currentPassword && (
              <p className="mt-1 text-xs text-red-500">{passwordErrors.currentPassword}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="label-text" htmlFor="newPassword">New password</label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                className="input-field"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
              />
              {passwordErrors.newPassword && (
                <p className="mt-1 text-xs text-red-500">{passwordErrors.newPassword}</p>
              )}
            </div>
            <div>
              <label className="label-text" htmlFor="confirmPassword">Confirm new password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className="input-field"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
              />
              {passwordErrors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">{passwordErrors.confirmPassword}</p>
              )}
            </div>
          </div>

          <button type="submit" className="btn-primary" disabled={savingPassword}>
            <FaLock className="h-4 w-4" /> {savingPassword ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
