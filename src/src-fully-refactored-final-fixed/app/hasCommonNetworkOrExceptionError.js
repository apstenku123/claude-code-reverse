/**
 * Checks if the provided error message contains common network or exception error phrases.
 *
 * @param {string} errorMessage - The error message to inspect. Can be null or undefined.
 * @param {boolean} isErrorFlag - Optional flag to immediately return true if set.
 * @returns {boolean} True if the error message contains known error phrases or if isErrorFlag is true; otherwise, false.
 */
function hasCommonNetworkOrExceptionError(errorMessage, isErrorFlag) {
  // Safely convert errorMessage to lowercase string, defaulting to empty string if null/undefined
  const normalizedMessage = errorMessage?.toLowerCase() ?? "";

  // Check for common error phrases in the normalized message
  const containsUncaughtException = normalizedMessage.includes("uncaught exception");
  const containsFailedToFetch = normalizedMessage.includes("failed to fetch");
  const containsNetworkError = normalizedMessage.includes("networkerror when attempting to fetch resource");

  // Return true if isErrorFlag is true or any of the error phrases are found
  return Boolean(isErrorFlag) || containsUncaughtException || containsFailedToFetch || containsNetworkError;
}

module.exports = hasCommonNetworkOrExceptionError;