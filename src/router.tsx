import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  // Derive basepath dynamically from Vite's compiled BASE_URL
  const rawBase = import.meta.env.BASE_URL || '/';
  const basepath = rawBase === '/' ? '/' : rawBase.replace(/\/$/, '');

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    basepath,
  });

  return router;
};
