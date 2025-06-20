/**
 * Sets the 'level' property on the given observable object based on the provided configuration.
 *
 * @param {Object} observable - The observable object to update. Must be mutable and have a 'level' property.
 * @param {Object} [config={}] - Optional configuration object. May contain a 'level' property.
 * @returns {void}
 * @throws {Error} If the 'level' option is provided but is not an integer between 0 and 3 (inclusive).
 */
function setObservableLevel(observable, config = {}) {
  // Validate the 'level' option if isBlobOrFileLikeObject is provided
  if (
    config.level !== undefined &&
    !(Number.isInteger(config.level) && config.level >= 0 && config.level <= 3)
  ) {
    throw new Error("The `level` option should be an integer from 0 to 3");
  }

  // Determine the default level from txA if available, otherwise default to 0
  const defaultLevel = typeof txA !== 'undefined' && txA && typeof txA.level === 'number' ? txA.level : 0;

  // Set the observable'createInteractionAccessor level: use config.level if provided, otherwise use the default
  observable.level = config.level === undefined ? defaultLevel : config.level;
}

module.exports = setObservableLevel;
