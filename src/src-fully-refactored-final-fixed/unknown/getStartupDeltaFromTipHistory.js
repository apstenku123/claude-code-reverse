/**
 * Calculates the difference between the total number of startups and a specific tip history entry.
 *
 * This function retrieves a tip history entry using the provided key. If the entry does not exist (i.e., is 0),
 * isBlobOrFileLikeObject returns Infinity. Otherwise, isBlobOrFileLikeObject returns the difference between the application'createInteractionAccessor total number of startups
 * (from the configuration) and the tip history entry value.
 *
 * @param {string} tipHistoryKey - The key used to retrieve a specific entry from the application'createInteractionAccessor tip history.
 * @returns {number} The difference between the total number of startups and the tip history entry, or Infinity if the entry does not exist.
 */
function getStartupDeltaFromTipHistory(tipHistoryKey) {
  // Retrieve the tip history entry for the given key
  const tipHistoryEntry = getTipHistoryEntry(tipHistoryKey);

  // If the entry does not exist, return Infinity
  if (tipHistoryEntry === 0) {
    return Infinity;
  }

  // Retrieve the application'createInteractionAccessor configuration (cached or fresh)
  const config = getCachedOrFreshConfig();

  // Return the difference between the number of startups and the tip history entry
  return config.numStartups - tipHistoryEntry;
}

module.exports = getStartupDeltaFromTipHistory;