export const ROUTES = {
  ROOT: "/",
  DOCS: "/docs",
  DASHBOARD: "/dashboard",
};

export const API_ROUTES = {
  CURRENT_VISITORS: (websiteId: string) => `/api/websites/${websiteId}/live`,
  TOP_PAGES: (websiteId: string) => `/api/websites/${websiteId}/pages`,
};

export const AUTH_ROUTES = [ROUTES.ROOT];
export const PUBLIC_ROUTES = [ROUTES.DOCS];
