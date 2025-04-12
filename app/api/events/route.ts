import { db } from "@/lib/db";
import { pageviews } from "@/lib/db/schema";
import { normalizeDomain } from "@/lib/utils";
import { type NextRequest, NextResponse } from "next/server";
import Sniffr from "sniffr";

export async function POST(req: NextRequest) {
  const payload = await req.json();
  const { path, host, referrer, userAgent, screenSize } = payload;

  // extract domain
  const domain = normalizeDomain(host);

  // look up the website
  const website = await db.query.websites.findFirst({
    where: (websites, { eq }) => eq(websites.domain, domain),
  });

  if (!website) {
    return NextResponse.json({ error: "Unregistered domain" }, { status: 400 });
  }

  // get ip address
  const ip = getIpAddress(req.headers);

  // get browser and os info
  const { browser, os } = getBrowserInfo(userAgent);

  // get device type
  const device = getDeviceType(screenSize, os);

  await db.insert(pageviews).values({
    websiteId: website.id,
    host,
    path,
    referrer,
    userAgent,
    screenSize,
  });

  return NextResponse.json({ ok: true });
}

function getIpAddress(headers: Headers) {
  const header = [
    "cf-connecting-ip",
    "x-client-ip",
    "x-forwarded-for",
    "do-connecting-ip",
    "fastly-client-ip",
    "true-client-ip",
    "x-real-ip",
    "x-cluster-client-ip",
    "x-forwarded",
    "forwarded",
    "x-appengine-user-ip",
  ].find((name) => headers.get(name));

  if (!header) return undefined;

  const ip = headers.get(header);
  if (!ip) return undefined;

  if (header === "x-forwarded-for") {
    return ip.split(",")?.[0]?.trim();
  }

  if (header === "forwarded") {
    const match = ip.match(/for=(\[?[0-9a-fA-F:.]+\]?)/);
    if (match) {
      return match[1];
    }
  }

  return ip;
}

function getBrowserInfo(userAgent: string) {
  const sniffr = new Sniffr();
  sniffr.sniff(userAgent);

  return {
    browser: sniffr.browser.name,
    os: sniffr.os.name,
  };
}

function getDeviceType(screenSize: string, os: string) {
  if (!screenSize) return "unknown";

  const [width] = screenSize.split("x");
  const DESKTOP_OS = [
    "Windows",
    "Linux",
    "Mac OS",
    "Chrome OS",
    "OpenBSD",
    "Firefox OS",
  ];
  const MOBILE_OS = [
    "iOS",
    "Blackberry OS",
    "Android",
    "Windows Phone",
    "Windows Mobile",
  ];
  const DESKTOP_SCREEN_WIDTH = 1920;
  const LAPTOP_SCREEN_WIDTH = 1024;
  const MOBILE_SCREEN_WIDTH = 479;
  const DEVICE_TYPE = {
    DESKTOP: "desktop",
    LAPTOP: "laptop",
    TABLET: "tablet",
    MOBILE: "Mobile",
  };

  if (DESKTOP_OS.includes(os)) {
    if (os === "Chrome OS" || Number(width) < DESKTOP_SCREEN_WIDTH) {
      return DEVICE_TYPE.LAPTOP;
    }

    return DEVICE_TYPE.DESKTOP;
  }

  if (MOBILE_OS.includes(os)) {
    return DEVICE_TYPE.MOBILE;
  }

  // Size-based fallback
  if (Number(width) >= DESKTOP_SCREEN_WIDTH) return DEVICE_TYPE.DESKTOP;
  if (Number(width) >= LAPTOP_SCREEN_WIDTH) return DEVICE_TYPE.LAPTOP;
  if (Number(width) >= MOBILE_SCREEN_WIDTH) return DEVICE_TYPE.TABLET;
  return DEVICE_TYPE.MOBILE;
}
