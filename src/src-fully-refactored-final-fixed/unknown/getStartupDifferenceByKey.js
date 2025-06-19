/**
 * Calculates the difference between the total number of startups and the tip history entry for a given key.
 * If the tip history entry does not exist (i.e., is 0), returns Infinity.
 *
 * @param {string} tipKey - The key used to retrieve the tip history entry from the cached configuration.
 * @returns {number} The difference between the total number of startups and the tip history entry, or Infinity if the entry does not exist.
 */
function getStartupDifferenceByKey(tipKey) {
  // Retrieve the tip history entry for the provided key from the cached configuration
  const tipHistoryEntry = getTipHistoryByKey(tipKey);

  // If the entry does not exist (is 0), return Infinity
  if (tipHistoryEntry === 0) {
    return Infinity;
  }

  // Retrieve the cached configuration object
  const cachedConfig = getCachedConfig();

  // Calculate and return the difference between the total number of startups and the tip history entry
  return cachedConfig.numStartups - tipHistoryEntry;
}

module.exports = getStartupDifferenceByKey;