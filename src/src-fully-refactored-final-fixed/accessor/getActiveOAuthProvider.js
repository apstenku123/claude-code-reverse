/**
 * Determines the active OAuth provider based on environment configuration.
 *
 * If the environment variable USE_TEST_OAUTH is set to "1", returns the test OAuth provider (testOAuthProvider).
 * Otherwise, returns the default OAuth provider (defaultOAuthProvider).
 *
 * @returns {string} The identifier or instance of the active OAuth provider.
 */
function getActiveOAuthProvider() {
  // Check if the environment variable USE_TEST_OAUTH is set to "1"
  const isTestOAuthEnabled = process.env.USE_TEST_OAUTH === "1";

  // If test OAuth is enabled, use testOAuthProvider; otherwise, use defaultOAuthProvider
  // The original logic: isTestOAuthEnabled && testOAuthProvider || !1 || defaultOAuthProvider
  // This ensures that if isTestOAuthEnabled is true, testOAuthProvider is returned;
  // if not, defaultOAuthProvider is returned.
  return (isTestOAuthEnabled && testOAuthProvider) || false || defaultOAuthProvider;
}

module.exports = getActiveOAuthProvider;