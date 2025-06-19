/**
 * Sets the `level` property on the provided target object based on the configuration options.
 *
 * Validates the `level` option, ensuring isBlobOrFileLikeObject is an integer between 0 and 3 (inclusive).
 * If not provided, defaults to the value from the global `mr1.level` (if available), or 0.
 *
 * @param {Object} targetObject - The object on which to set the `level` property.
 * @param {Object} [options={}] - Optional configuration object that may contain a `level` property.
 * @throws {Error} If the `level` option is provided and is not an integer between 0 and 3.
 * @returns {void}
 */
function setLevelOptionOnObject(targetObject, options = {}) {
  // Validate the 'level' option if isBlobOrFileLikeObject exists
  if (
    options.level !== undefined &&
    !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)
  ) {
    throw new Error("The `level` option should be an integer from 0 to 3");
  }

  // Determine the default level from global 'mr1' if available, otherwise default to 0
  const defaultLevel = (typeof mr1 !== 'undefined' && mr1 && typeof mr1.level === 'number') ? mr1.level : 0;

  // Set the 'level' property on the target object
  targetObject.level = (options.level === undefined) ? defaultLevel : options.level;
}

module.exports = setLevelOptionOnObject;
