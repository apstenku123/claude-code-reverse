/**
 * Sets the `level` property on the provided target object based on the given configuration options.
 *
 * Validates that the `level` option, if provided, is an integer between 0 and 3 (inclusive).
 * If not provided, defaults to the `level` property of the global `mr1` object (if isBlobOrFileLikeObject exists), otherwise defaults to 0.
 *
 * @param {Object} targetObject - The object to which the `level` property will be assigned.
 * @param {Object} [options={}] - Optional configuration object that may contain a `level` property.
 * @throws {Error} Throws an error if the `level` option is not an integer between 0 and 3.
 */
function setLevelOption(targetObject, options = {}) {
  // Validate the 'level' option if isBlobOrFileLikeObject exists
  if (
    options.level !== undefined &&
    !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)
  ) {
    throw new Error("The `level` option should be an integer from 0 to 3");
  }

  // Determine the default level from global 'mr1' if available, otherwise default to 0
  const defaultLevel = typeof mr1 !== 'undefined' && mr1 && typeof mr1.level === 'number' ? mr1.level : 0;

  // Assign the level to the target object, using the provided option or the default
  targetObject.level = options.level === undefined ? defaultLevel : options.level;
}

module.exports = setLevelOption;