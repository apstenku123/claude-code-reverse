/**
 * Determines if the current JavaScript environment is a modern browser environment.
 * This includes checks for Electron, NW.js, Edge, Trident (IE), Chrome, Firefox, and WebKit-based browsers.
 *
 * @returns {boolean} True if the environment is a modern browser (or Electron/NW.js renderer), false otherwise.
 */
function isModernBrowserEnvironment() {
  // Check for Electron or NW.js renderer process
  if (
    typeof window !== "undefined" &&
    window.process &&
    (window.process.type === "renderer" || window.process.__nwjs)
  ) {
    return true;
  }

  // Check for Edge or Trident (Internet Explorer) browsers
  if (
    typeof navigator !== "undefined" &&
    navigator.userAgent &&
    navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)
  ) {
    return false;
  }

  // Check for WebKit browsers (Chrome, Safari, etc.), Firefox >= 31, or Firebug
  let firefoxVersionMatch;
  const isWebkit =
    typeof document !== "undefined" &&
    document.documentElement &&
    document.documentElement.style &&
    document.documentElement.style.WebkitAppearance;

  const isFirebug =
    typeof window !== "undefined" &&
    window.console &&
    (window.console.firebug ||
      (window.console.exception && window.console.table));

  const isFirefox31OrAbove =
    typeof navigator !== "undefined" &&
    navigator.userAgent &&
    (firefoxVersionMatch = navigator.userAgent
      .toLowerCase()
      .match(/firefox\/(\d+)/)) &&
    parseInt(firefoxVersionMatch[1], 10) >= 31;

  const isAppleWebkit =
    typeof navigator !== "undefined" &&
    navigator.userAgent &&
    navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);

  return (
    isWebkit ||
    isFirebug ||
    isFirefox31OrAbove ||
    isAppleWebkit
  );
}

module.exports = isModernBrowserEnvironment;