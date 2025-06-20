/**
 * Retrieves the current page URL without query parameters or hash fragments.
 * Utilizes a safe window accessor to avoid errors in non-browser environments.
 *
 * @returns {string|undefined} The base URL of the current page (without query/hash), or undefined if unavailable.
 */
const getCurrentPageUrlWithoutQueryOrHash = () => {
  try {
    // Safely obtain the window object using JCA._getWindowSafe()
    const windowObject = JCA._getWindowSafe();
    // If window object is available, extract the base URL (without query/hash)
    return windowObject?.location.href.split(/[?#]/)[0];
  } catch (error) {
    // In case of any error (e.g., window not available), return undefined
    return;
  }
};

module.exports = getCurrentPageUrlWithoutQueryOrHash;
