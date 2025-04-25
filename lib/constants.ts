import { getURL } from "@/lib/utils";

export const SITE_CONFIG = {
  NAME: "Analytics - Lightweight Google Analytics Alternative",
  SUFFIX_NAME: "Analytics",
  URL: "https://analytics.ritiksharma.me",
  DESCRIPTION:
    "Understand your website traffic with essential insights. No cookies, no personal data collection, just the stats that matter.",
  OG_IMAGE: {
    WIDTH: 1200,
    HEIGHT: 630,
    TYPE: "image/png",
  },
};

export const openGraphImage = {
  title: {
    default: SITE_CONFIG.NAME,
    template: `%s - ${SITE_CONFIG.SUFFIX_NAME}`,
  },
  images: [
    {
      url: getURL("/opengraph-image.png"),
      width: SITE_CONFIG.OG_IMAGE.WIDTH,
      height: SITE_CONFIG.OG_IMAGE.HEIGHT,
      alt: SITE_CONFIG.NAME,
      type: SITE_CONFIG.OG_IMAGE.TYPE,
    },
  ],
  description: SITE_CONFIG.DESCRIPTION,
  url: SITE_CONFIG.URL,
  siteName: SITE_CONFIG.NAME,
  type: "website",
  locale: "en_US",
};
