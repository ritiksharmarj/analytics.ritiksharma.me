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
  TOP_BROWSERS: (websiteId: string) => `/api/websites/${websiteId}/browsers`,
  TOP_DEVICES: (websiteId: string) => `/api/websites/${websiteId}/devices`,
  TOP_OS: (websiteId: string) => `/api/websites/${websiteId}/os`,
  STATS: {
    STATS: (websiteId: string) => `/api/websites/${websiteId}/stats`,
    TRAFFIC: (websiteId: string) => `/api/websites/${websiteId}/stats/traffic`,
  },
};

export const AUTH_ROUTES = [ROUTES.ROOT];
export const PUBLIC_ROUTES = [ROUTES.DOCS];
