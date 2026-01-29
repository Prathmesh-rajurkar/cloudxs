"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { isTokenValid, logout } from "@/utils/auth";

const AUTH_ROUTES = ["/login", "/signup"];
const PROTECTED_ROUTES = ["/dashboard"];

const AppGuard = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const isAuthRoute = AUTH_ROUTES.some((r) =>
      pathname.startsWith(r)
    );
    const isProtectedRoute = PROTECTED_ROUTES.some((r) =>
      pathname.startsWith(r)
    );

    const valid = isTokenValid();

    // ❌ Not logged in but trying to access protected route
    if (isProtectedRoute && !valid) {
      logout();
      router.replace("/login");
      return;
    }

    // ✅ Logged in but trying to access login/signup
    if (isAuthRoute && valid) {
      router.replace("/dashboard");
      return;
    }
  }, [pathname]);

  return <>{children}</>;
};

export default AppGuard;
