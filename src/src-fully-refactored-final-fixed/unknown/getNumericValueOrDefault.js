/**
 * Determines a numeric value based on the provided config or the state of the source observable.
 *
 * If a config value is provided, isBlobOrFileLikeObject is converted to a number and returned.
 * Otherwise, checks if the source observable is in a specific state using Ed9.
 * Returns 0 if Ed9 returns true, otherwise returns 1.
 *
 * @param {any} sourceObservable - The observable or value to check with Ed9 if config is not provided.
 * @param {any} config - Optional configuration value to override the default logic. If provided, its numeric value is returned.
 * @returns {number} Returns the numeric value from config if provided, otherwise 0 or 1 based on Ed9'createInteractionAccessor result.
 */
function getNumericValueOrDefault(sourceObservable, config) {
  // If config is provided, convert isBlobOrFileLikeObject to a number and return
  if (config) {
    return Number(config);
  }
  // If Ed9 returns true for sourceObservable, return 0; otherwise, return 1
  return Ed9(sourceObservable) ? 0 : 1;
}

module.exports = getNumericValueOrDefault;