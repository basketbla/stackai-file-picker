interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
  };
}

interface AuthHeaders {
  Authorization: string;
}

export async function getAuthHeaders(
  email: string,
  password: string
): Promise<AuthHeaders> {
  const requestUrl = `${process.env.NEXT_PUBLIC_SUPABASE_AUTH_URL}/auth/v1/token?grant_type=password`;

  const response = await fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    },
    body: JSON.stringify({
      email,
      password,
      gotrue_meta_security: {},
    }),
  });

  if (!response.ok) {
    throw new Error(`Authentication failed: ${response.statusText}`);
  }

  const data: AuthResponse = await response.json();

  return {
    Authorization: `Bearer ${data.access_token}`,
  };
}

export function storeToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("stack_ai_token", token);
  // Also store in cookie for server-side access
  document.cookie = `stack_ai_token=${token}; path=/; max-age=${
    60 * 60 * 24 * 7
  }; samesite=lax`;
}

export function clearToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("stack_ai_token");
  // Also clear the cookie
  document.cookie =
    "stack_ai_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

// Client-side logout function that calls the logout route and redirects
export async function logoutAndRedirect(): Promise<void> {
  try {
    // Call the logout route to clear server-side cookies
    await fetch("/api/auth/logout", { method: "POST" });
  } catch (error) {
    console.error("Error calling logout route:", error);
  }

  // Clear client-side storage
  clearToken();

  // Redirect to login
  window.location.href = "/login";
}

export function extractTokenFromAuthHeader(authHeader: string): string {
  return authHeader.replace("Bearer ", "");
}

// Server-side cookie utilities
export function getTokenFromCookies(cookieString?: string): string | null {
  if (typeof window !== "undefined") {
    // Client-side
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split("=");
      if (name === "stack_ai_token") {
        return value;
      }
    }
    return null;
  }

  // Server-side
  if (!cookieString) return null;

  const cookies = cookieString.split(";");
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === "stack_ai_token") {
      return value;
    }
  }
  return null;
}

// Server-side authenticated client
export async function createServerAuthenticatedClient(token: string) {
  const { StackAiClient } = await import("../stack-api-autogen");

  return new StackAiClient({
    BASE: process.env.NEXT_PUBLIC_API_URL,
    TOKEN: token,
  });
}
