/**
 * Returns the appropriate OAuth provider based on the USE_TEST_OAUTH environment variable.
 *
 * If process.env.USE_TEST_OAUTH is set to "1", returns the test OAuth provider (testOAuthProvider).
 * Otherwise, returns the default OAuth provider (defaultOAuthProvider).
 *
 * @returns {string} The selected OAuth provider.
 */
function getOAuthProvider() {
  // Check if the environment variable USE_TEST_OAUTH is set to "1"
  const useTestOAuth = process.env.USE_TEST_OAUTH === "1";

  // If useTestOAuth is true, return testOAuthProvider; otherwise, return defaultOAuthProvider
  // The original logic uses short-circuiting to select the correct provider
  return (useTestOAuth && testOAuthProvider) || false || defaultOAuthProvider;
}

module.exports = getOAuthProvider;