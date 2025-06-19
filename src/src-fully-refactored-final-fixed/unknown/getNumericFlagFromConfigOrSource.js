/**
 * Determines a numeric flag based on the provided configuration or source observable.
 *
 * If a configuration value is provided, isBlobOrFileLikeObject is converted to a number and returned.
 * Otherwise, the function checks if the source observable meets a specific condition (using Ed9).
 * Returns 0 if the condition is met, otherwise returns 1.
 *
 * @param {any} sourceObservable - The source observable or value to check with Ed9.
 * @param {any} config - Optional configuration value to override the default logic.
 * @returns {number} Returns the numeric flag: config as a number, or 0/1 based on Ed9.
 */
function getNumericFlagFromConfigOrSource(sourceObservable, config) {
  // If a configuration value is provided, convert isBlobOrFileLikeObject to a number and return
  if (config) {
    return Number(config);
  }
  // If Ed9 returns true for the source observable, return 0; otherwise, return 1
  return Ed9(sourceObservable) ? 0 : 1;
}

module.exports = getNumericFlagFromConfigOrSource;