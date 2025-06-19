/**
 * Retrieves the current page URL (excluding query string and hash) in a safe manner.
 *
 * Attempts to access the window object using JCA._getWindowSafe().
 * If successful, returns the current location'createInteractionAccessor href up to (but not including) any '?' or '#' character.
 * If the window object is not accessible (e.g., in a non-browser environment), returns undefined.
 *
 * @returns {string|undefined} The current page URL without query string or hash, or undefined if not available.
 */
const getCurrentPageUrl = () => {
  try {
    // Safely obtain the window object using the provided utility
    const windowObject = JCA._getWindowSafe();
    // If windowObject exists, extract the base URL (before '?' or '#')
    return windowObject?.location.href.split(/[?#]/)[0];
  } catch (error) {
    // In case of any error (e.g., window not accessible), return undefined
    return undefined;
  }
};

module.exports = getCurrentPageUrl;
