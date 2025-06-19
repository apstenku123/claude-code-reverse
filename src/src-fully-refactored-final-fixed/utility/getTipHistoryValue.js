/**
 * Retrieves a value from the application'createInteractionAccessor tips history configuration by key.
 *
 * @param {string} tipKey - The key for the desired tip value in the tips history.
 * @returns {number} The value associated with the given key in the tips history, or 0 if not found.
 */
function getTipHistoryValue(tipKey) {
  // Retrieve the tips history object from the application'createInteractionAccessor configuration
  const tipsHistory = getTipsHistory();
  // Return the value for the given key, or 0 if the key does not exist
  return tipsHistory[tipKey] || 0;
}

module.exports = getTipHistoryValue;