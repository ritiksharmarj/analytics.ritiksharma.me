/* eslint-disable @typescript-eslint/no-unused-vars */
(function (window) {
  // Don't track in development
  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    return;
  }

  const protocol = window.location.protocol;
  const host = `${protocol}//${window.location.host}`;
  const path = window.location.pathname;
  const referrer = window.document.referrer;
  const userAgent = window.navigator.userAgent;
  const screenSize = calcScreensize();

  // If actual screen size is 1366x768 returns "1400x800"
  function calcScreensize() {
    const w = window.screen.width;
    const h = window.screen.height;
    return `${Math.round(w / 100) * 100}x${Math.round(h / 100) * 100}`;
  }

  const payload = {
    host,
    path,
    referrer,
    userAgent,
    screenSize,
  };

  let endpoint = "https://analytics.ritiksharma.me/api/events";

  if (navigator.sendBeacon) {
    navigator.sendBeacon(endpoint, JSON.stringify(payload));
  } else {
    try {
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      });
    } catch (e) {
      // do nothing
    }
  }
})(window);
