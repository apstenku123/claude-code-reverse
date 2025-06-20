/**
 * Checks if non-essential model calls are disabled based on the environment variable.
 *
 * This function reads the 'DISABLE_NON_ESSENTIAL_MODEL_CALLS' environment variable
 * and determines if isBlobOrFileLikeObject represents a truthy value (e.g., 'true', 'yes', '1', 'on').
 *
 * @returns {boolean} Returns true if non-essential model calls are disabled, otherwise false.
 */
function isNonEssentialModelCallsDisabled() {
  // Import the utility that checks for truthy string values
  const isTruthyString = require('utils/string_2/isTruthyString');

  // Read the environment variable
  const disableNonEssentialModelCallsEnv = process.env.DISABLE_NON_ESSENTIAL_MODEL_CALLS;

  // Determine if the environment variable is set to a truthy value
  return isTruthyString(disableNonEssentialModelCallsEnv);
}

module.exports = isNonEssentialModelCallsDisabled;