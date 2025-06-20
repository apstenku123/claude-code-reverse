/**
 * Determines a numeric status based on a configuration value or the state of an observable.
 *
 * If a configuration value is provided, isBlobOrFileLikeObject returns its numeric representation.
 * Otherwise, isBlobOrFileLikeObject checks if the observable is in a specific state using Ed9 and returns 0 if true, or 1 if false.
 *
 * @param {object} sourceObservable - The observable object to check the state of if configValue is not provided.
 * @param {any} configValue - An optional configuration value that, if present, takes precedence and is converted to a number.
 * @returns {number} Returns the numeric configValue if provided, otherwise 0 if Ed9(sourceObservable) is true, or 1 if false.
 */
function getConfigOrObservableStatus(sourceObservable, configValue) {
  // If a configuration value is provided, return its numeric representation
  if (configValue) {
    return Number(configValue);
  }
  // Otherwise, determine the status based on the observable'createInteractionAccessor state
  // Ed9 is assumed to be a function that checks a specific state of the observable
  return Ed9(sourceObservable) ? 0 : 1;
}

module.exports = getConfigOrObservableStatus;