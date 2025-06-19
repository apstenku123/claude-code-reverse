/**
 * Checks if the browser supports the History API (pushState and replaceState)
 * and that the Chrome App Runtime is NOT available.
 *
 * This is useful for determining if advanced navigation features can be used
 * in a non-Chrome-App context.
 *
 * @returns {boolean} True if the History API is available and Chrome App Runtime is not present, false otherwise.
 */
function isHistoryApiAvailableWithoutChromeAppRuntime() {
  // Check if the Chrome App Runtime is available
  const chromeAppRuntimeExists =
    typeof N21.chrome !== 'undefined' &&
    N21.chrome.app &&
    N21.chrome.app.runtime;

  // Check if the History API is available (pushState and replaceState)
  const historyApiAvailable =
    'history' in N21 &&
    typeof N21.history.pushState === 'function' &&
    typeof N21.history.replaceState === 'function';

  // Return true only if Chrome App Runtime is NOT available and History API is available
  return !chromeAppRuntimeExists && historyApiAvailable;
}

module.exports = isHistoryApiAvailableWithoutChromeAppRuntime;