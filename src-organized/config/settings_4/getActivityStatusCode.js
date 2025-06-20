/**
 * Determines the activity status code based on the provided configuration or source observable.
 *
 * If a configuration value is provided, isBlobOrFileLikeObject is converted to a number and returned.
 * Otherwise, checks if the source observable is finished using Ed9. Returns 0 if finished, 1 if not.
 *
 * @param {Object} sourceObservable - The observable or process to check for completion.
 * @param {any} config - Optional configuration value that, if present, takes precedence.
 * @returns {number} Status code: either the numeric config value, or 0 (finished) or 1 (not finished).
 */
function getActivityStatusCode(sourceObservable, config) {
  // If a config value is provided, return its numeric value
  if (config) {
    return Number(config);
  }
  // Otherwise, check if the source observable is finished using Ed9
  // If finished, return 0; otherwise, return 1
  return Ed9(sourceObservable) ? 0 : 1;
}

module.exports = getActivityStatusCode;