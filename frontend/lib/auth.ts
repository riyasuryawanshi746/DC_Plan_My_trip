// lib/auth.ts

const API_BASE_URL = "http://127.0.0.1:5000";

// Get stored tokens
export const getAccessToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token");
  }
  return null;
};

export const getRefreshToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("refresh_token");
  }
  return null;
};

// Clear auth data (logout)
export const clearAuth = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};

// Get current user from localStorage
export const getCurrentUser = () => {
  if (typeof window !== "undefined") {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  }
  return null;
};

// Refresh the access token
export const refreshAccessToken = async (): Promise<boolean> => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  try {
    const response = await fetch(`${API_BASE_URL}/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

// Make authenticated API request
export const authenticatedFetch = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = getAccessToken();

  if (!token) {
    throw new Error("No access token available");
  }

  // Add Authorization header
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  let response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // If token expired, try to refresh
  if (response.status === 401) {
    const refreshed = await refreshAccessToken();

    if (refreshed) {
      // Retry request with new token
      const newToken = getAccessToken();
      headers.Authorization = `Bearer ${newToken}`;
      response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });
    } else {
      // Refresh failed, clear auth and redirect to login
      clearAuth();
      if (typeof window !== "undefined") {
        window.location.href = "/auth/login";
      }
    }
  }

  return response;
};

// Logout function
export const logout = async () => {
  try {
    await authenticatedFetch("/logout", { method: "POST" });
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    clearAuth();
    if (typeof window !== "undefined") {
      window.location.href = "/auth/login";
    }
  }
};
