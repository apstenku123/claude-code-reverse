/**
 * Returns the appropriate OAuth accessor based on the USE_TEST_OAUTH environment variable.
 * If USE_TEST_OAUTH is set to "1", returns the test OAuth accessor.
 * Otherwise, returns the default OAuth accessor.
 *
 * @returns {any} The selected OAuth accessor (test or default)
 */
function getOAuthAccessor() {
  // Import the test and default OAuth accessors
  const testOAuthAccessor = mE9;
  const defaultOAuthAccessor = hE9;

  // Check if the environment variable USE_TEST_OAUTH is set to "1"
  // If so, return the test accessor; otherwise, return the default accessor
  return (process.env.USE_TEST_OAUTH === "1" && testOAuthAccessor) || false || defaultOAuthAccessor;
}

module.exports = getOAuthAccessor;