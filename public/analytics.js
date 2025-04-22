((window, document) => {
  const endpoint = "https://analytics.ritiksharma.me/api/events";

  let initialPageViewSent = false;
  let lastPath = "";

  const environment = {
    isLocalhost:
      /^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(
        location.hostname,
      ) || location.protocol === "file:",
  };

  const sendPayload = async (data) => {
    try {
      if (navigator.sendBeacon) {
        const success = navigator.sendBeacon(endpoint, JSON.stringify(data));
        if (success) return;
      }
      await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        keepalive: true,
      });
    } catch (err) {
      console.error("Analytics send error:", err);
    }
  };

  const sendPageView = () => {
    if (environment.isLocalhost) {
      console.log("Analytics tracking disabled on localhost.");
      return;
    }

    const currentPath = location.pathname;

    // Prevent duplicate SPA page views if path hasn't changed
    if (initialPageViewSent && currentPath === lastPath) {
      return;
    }

    const origin = location.origin;
    const path = currentPath;
    const userAgent = window.navigator.userAgent;
    const screenSize = `${window.screen.width}x${window.screen.height}`;
    const referrer = document.referrer || "";

    const payload = {
      host: origin,
      path,
      referrer,
      userAgent,
      screenSize,
    };

    sendPayload(payload);

    lastPath = currentPath;
    if (!initialPageViewSent) {
      initialPageViewSent = true;
    }
  };

  // --- Initial Page Load Trigger ---
  const handleVisibilityChange = () => {
    if (document.visibilityState === "visible" && !initialPageViewSent) {
      window.requestAnimationFrame(sendPageView);
    }
  };

  if (document.visibilityState === "visible") {
    window.requestAnimationFrame(sendPageView);
  } else {
    document.addEventListener("visibilitychange", handleVisibilityChange, {
      once: true,
    });
  }

  // --- SPA Navigation Triggers ---
  const originalPushState = history.pushState;
  history.pushState = function (...args) {
    originalPushState.apply(this, args);
    window.requestAnimationFrame(() => {
      sendPageView();
    });
  };

  window.addEventListener("popstate", () => {
    window.requestAnimationFrame(() => {
      sendPageView();
    });
  });
})(window, document);
