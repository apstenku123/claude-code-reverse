/**
 * Checks if the Sentry browser bundle global variable is defined and truthy.
 *
 * @returns {boolean} Returns true if __SENTRY_BROWSER_BUNDLE__ is defined and truthy, otherwise false.
 */
function isSentryBrowserBundleDefined() {
  // Check if the global variable __SENTRY_BROWSER_BUNDLE__ exists and is truthy
  return typeof __SENTRY_BROWSER_BUNDLE__ !== "undefined" && Boolean(__SENTRY_BROWSER_BUNDLE__);
}

module.exports = isSentryBrowserBundleDefined;