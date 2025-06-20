/**
 * Executes the normalizeObjectForSerialization function with the provided parameters, returning a fallback error object if an exception occurs.
 *
 * @param {any} sourceObservable - The source observable or input to be processed by normalizeObjectForSerialization.
 * @param {number} [maxItems=100] - The maximum number of items to process (default: 100).
 * @param {number} [timeout=Infinity] - The timeout value for the operation (default: Infinity).
 * @returns {any} The result of normalizeObjectForSerialization, or an error object if an exception is thrown.
 */
function executeP21WithFallback(sourceObservable, maxItems = 100, timeout = Infinity) {
  try {
    // Attempt to execute the main normalizeObjectForSerialization function with the provided arguments
    return normalizeObjectForSerialization("", sourceObservable, maxItems, timeout);
  } catch (error) {
    // Return a standardized error object if normalizeObjectForSerialization throws an exception
    return {
      ERROR: `**non-serializable** (${error})`
    };
  }
}

module.exports = executeP21WithFallback;