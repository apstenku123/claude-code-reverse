/**
 * Checks if the Chrome App runtime is unavailable and if the browser supports the History API (pushState and replaceState).
 *
 * @returns {boolean} Returns true if Chrome App runtime is not available and History API is supported; otherwise, false.
 */
function isChromeAppRuntimeUnavailableWithHistorySupport() {
  // Access the 'chrome' object from the global N21 object
  const chromeObject = N21.chrome;

  // Determine if the Chrome App runtime is available
  const isChromeAppRuntimeAvailable = chromeObject && chromeObject.app && chromeObject.app.runtime;

  // Check if the browser supports the History API (pushState and replaceState)
  const isHistoryApiSupported = (
    'history' in N21 &&
    Boolean(N21.history.pushState) &&
    Boolean(N21.history.replaceState)
  );

  // Return true only if Chrome App runtime is NOT available and History API is supported
  return !isChromeAppRuntimeAvailable && isHistoryApiSupported;
}

module.exports = isChromeAppRuntimeUnavailableWithHistorySupport;