/**
 * Checks if the Sentry browser bundle global variable is defined and truthy.
 *
 * This function is useful for determining if the Sentry browser bundle has been loaded
 * in the current JavaScript environment (such as a browser or Node.js).
 *
 * @returns {boolean} Returns true if the global __SENTRY_BROWSER_BUNDLE__ variable is defined and truthy; otherwise, false.
 */
function isSentryBrowserBundlePresent() {
  // Check if the global variable __SENTRY_BROWSER_BUNDLE__ exists and is truthy
  return typeof __SENTRY_BROWSER_BUNDLE__ !== "undefined" && Boolean(__SENTRY_BROWSER_BUNDLE__);
}

module.exports = isSentryBrowserBundlePresent;