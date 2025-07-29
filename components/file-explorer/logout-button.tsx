import { logoutAndRedirect } from "@/lib/auth";
import { Button } from "../ui/button";

export function LogoutButton() {
  const handleLogout = () => {
    logoutAndRedirect();
  };

  return (
    <Button onClick={handleLogout} variant="outline">
      Logout
    </Button>
  );
} 