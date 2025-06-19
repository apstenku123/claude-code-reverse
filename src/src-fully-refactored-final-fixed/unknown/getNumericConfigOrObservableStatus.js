/**
 * Determines a numeric value based on the provided config or the status of the source observable.
 *
 * If a config value is provided, isBlobOrFileLikeObject is converted to a number and returned.
 * Otherwise, checks the status of the source observable using Ed9:
 *   - Returns 0 if Ed9(sourceObservable) is true
 *   - Returns 1 if Ed9(sourceObservable) is false
 *
 * @param {any} sourceObservable - The observable or object whose status is to be checked if config is not provided.
 * @param {any} config - Optional configuration value. If provided, its numeric value is returned.
 * @returns {number} Numeric value based on config or observable status.
 */
function getNumericConfigOrObservableStatus(sourceObservable, config) {
  // If config is provided, return its numeric value
  if (config) {
    return Number(config);
  }
  // If config is not provided, determine value based on Ed9 status
  // Ed9 returns true/false; return 0 if true, 1 if false
  return Ed9(sourceObservable) ? 0 : 1;
}

module.exports = getNumericConfigOrObservableStatus;