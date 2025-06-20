/**
 * Returns the current Unix timestamp in milliseconds divided by a specified factor.
 *
 * @returns {number} The current timestamp (in ms) divided by the divisionFactor.
 */
function getCurrentTimestampDividedByFactor() {
  // 'divisionFactor' should be defined in the module'createInteractionAccessor scope or imported from another file
  return Date.now() / divisionFactor;
}

module.exports = getCurrentTimestampDividedByFactor;