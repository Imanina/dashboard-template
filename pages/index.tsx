import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../lib/auth-context";
import { DEFAULT_ROLE, getDefaultRouteForRole } from "../lib/role-access";

export default function Home() {
  const router = useRouter();
  const { user, loading, role } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        const activeRole = role || DEFAULT_ROLE;
        router.replace(getDefaultRouteForRole(activeRole));
      } else {
        router.replace("/login");
      }
    }
  }, [user, loading, router, role]);

  // Show loading while checking auth status
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return null;
} 