"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      const redirectTo = encodeURIComponent(pathname);
      router.replace(`/login?callbackUrl=${redirectTo}`);
    }
  }, [session, isPending, pathname, router]);

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <i className="fa-solid fa-spinner fa-spin text-3xl text-[#f6e262]"></i>
      </div>
    );
  }

  if (!session) return null;

  return children;
};

export default PrivateRoute;