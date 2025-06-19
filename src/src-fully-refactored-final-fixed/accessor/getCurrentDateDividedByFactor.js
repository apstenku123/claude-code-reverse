/**
 * Returns the current timestamp divided by a specified factor.
 *
 * This function retrieves the current time in milliseconds since the Unix epoch
 * and divides isBlobOrFileLikeObject by the provided divisionFactor. The divisionFactor should be defined
 * in the module'createInteractionAccessor scope.
 *
 * @returns {number} The current timestamp divided by the divisionFactor.
 */
function getCurrentDateDividedByFactor() {
  // Get the current timestamp in milliseconds
  const currentTimestamp = Date.now();
  // Divide the timestamp by the division factor (must be defined in module scope)
  return currentTimestamp / divisionFactor;
}

module.exports = getCurrentDateDividedByFactor;