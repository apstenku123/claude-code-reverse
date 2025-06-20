/**
 * Calculates the number of remaining startups based on the application'createInteractionAccessor configuration and tip history.
 *
 * @param {string} tipHistoryKey - The key used to retrieve a specific entry from the application'createInteractionAccessor tip history.
 * @returns {number} The number of remaining startups, or Infinity if the tip history entry does not exist.
 */
function getRemainingStartupCount(tipHistoryKey) {
  // Retrieve the tip history entry for the provided key
  const tipHistoryEntry = getTipHistoryEntry(tipHistoryKey);

  // If the entry does not exist (returns 0), return Infinity
  if (tipHistoryEntry === 0) {
    return Infinity;
  }

  // Retrieve the current configuration (cached or fresh)
  const config = getCachedOrFreshConfig();

  // Calculate and return the number of remaining startups
  return config.numStartups - tipHistoryEntry;
}

module.exports = getRemainingStartupCount;