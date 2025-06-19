/**
 * Attempts to retrieve the primary value using getPrimaryValue().
 * If an error occurs, retrieves a fallback value using getFallbackValue().
 *
 * @returns {any} The primary value if successful, otherwise the fallback value.
 */
function getPrimaryOrFallbackValue() {
  try {
    // Try to get the primary value
    return getPrimaryValue();
  } catch (error) {
    // If an error occurs, return the fallback value
    return getFallbackValue();
  }
}

module.exports = getPrimaryOrFallbackValue;