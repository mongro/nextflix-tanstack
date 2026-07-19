import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";

let lastValidPage = "/"; // fallback

export function useLastValidPage(excludedPath: string) {
  const pathname = useLocation({
    select: (location) => location.pathname,
  });

  useEffect(() => {
    if (!pathname.includes(excludedPath)) {
      lastValidPage = pathname;
    }
  }, [pathname, excludedPath]);

  return lastValidPage;
}
