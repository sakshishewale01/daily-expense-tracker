import { useAuthContext } from '../context/AuthContext.jsx';

/**
 * Thin convenience wrapper so components can `import { useAuth } from
 * '../hooks/useAuth'` without needing to know the context lives elsewhere.
 */
export function useAuth() {
  return useAuthContext();
}
