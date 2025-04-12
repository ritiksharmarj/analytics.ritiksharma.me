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
  const screenSize = `${window.screen.width}x${window.screen.height}`;

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
