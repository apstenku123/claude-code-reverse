/**
 * Retrieves the base URL (without query string or hash) of the current page, if accessible.
 *
 * Attempts to safely access the global window object via JCA._getWindowSafe().
 * If successful, extracts and returns the current page'createInteractionAccessor URL up to (but not including) any query string or hash fragment.
 * If the window or location is not accessible (e.g., in a non-browser environment), returns undefined.
 *
 * @returns {string|undefined} The base URL of the current page, or undefined if not available.
 */
function getCurrentPageBaseUrl() {
  try {
    // Safely obtain the window object using JCA._getWindowSafe()
    const windowObject = JCA._getWindowSafe();
    // If window or location is unavailable, return undefined
    if (!windowObject || !windowObject.location || typeof windowObject.location.href !== 'string') {
      return undefined;
    }
    // Split the URL at the first '?' or '#' to remove query string and hash
    const baseUrl = windowObject.location.href.split(/[?#]/)[0];
    return baseUrl;
  } catch (error) {
    // If accessing window or location fails, return undefined
    return undefined;
  }
}

module.exports = getCurrentPageBaseUrl;
