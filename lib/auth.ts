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

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("stack_ai_token");
}

export function storeToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("stack_ai_token", token);
}

export function clearToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("stack_ai_token");
}

export function extractTokenFromAuthHeader(authHeader: string): string {
  return authHeader.replace("Bearer ", "");
}
