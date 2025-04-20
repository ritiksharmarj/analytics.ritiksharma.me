export const ROUTES = {
  ROOT: "/",
  DOCS: "/docs",
  DASHBOARD: "/dashboard",
};

export const API_ROUTES = {
  CURRENT_VISITORS: (websiteId: string) => `/api/websites/${websiteId}/live`,
  TOP_PAGES: (websiteId: string) => `/api/websites/${websiteId}/pages`,
  TOP_REFERRERS: (websiteId: string) => `/api/websites/${websiteId}/referrers`,
  TOP_COUNTRIES: (websiteId: string) => `/api/websites/${websiteId}/countries`,
};

export const AUTH_ROUTES = [ROUTES.ROOT];
export const PUBLIC_ROUTES = [ROUTES.DOCS];
