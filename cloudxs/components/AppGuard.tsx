"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { isTokenValid } from "@/utils/auth";

const AUTH_ROUTES = ["/login", "/signup"];

const AppGuard = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const isAuthRoute = AUTH_ROUTES.some((r) => pathname.startsWith(r));

    const valid = isTokenValid();

    // ✅ Logged in but trying to access login/signup
    if (isAuthRoute && valid) {
      router.replace("/dashboard");
      return;
    }
  }, [pathname, router]);

  return <>{children}</>;
};

export default AppGuard;
