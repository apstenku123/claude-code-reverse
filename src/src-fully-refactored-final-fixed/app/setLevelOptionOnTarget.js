/**
 * Sets the `level` property on the target object based on the provided options.
 *
 * Validates that the `level` option, if provided, is an integer between 0 and 3 (inclusive).
 * If not provided, defaults to the current `level` property of the global `txA` object, or 0 if `txA` is undefined.
 *
 * @param {Object} targetObject - The object to which the `level` property will be assigned.
 * @param {Object} [options={}] - Optional configuration object. May include a `level` property.
 * @throws {Error} If the `level` option is provided and is not an integer between 0 and 3.
 */
function setLevelOptionOnTarget(targetObject, options = {}) {
  // Validate the 'level' option if isBlobOrFileLikeObject exists
  if (
    options.level !== undefined &&
    !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)
  ) {
    throw new Error("The `level` option should be an integer from 0 to 3");
  }

  // Determine the default level from global txA if available, otherwise default to 0
  const defaultLevel = typeof txA !== 'undefined' && txA && txA.level !== undefined ? txA.level : 0;

  // Assign the level to the target object
  targetObject.level = options.level === undefined ? defaultLevel : options.level;
}

module.exports = setLevelOptionOnTarget;
