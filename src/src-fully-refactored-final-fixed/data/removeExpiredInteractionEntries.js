/**
 * Removes expired entries from the interaction entries map (uH1).
 * An entry is considered expired if its timestamp is older than the allowed interval (IR2).
 *
 * @returns {void} This function does not return a value.
 */
function removeExpiredInteractionEntries() {
  // Get the current timestamp in milliseconds
  const currentTimestamp = Date.now();

  // Iterate over each entry in the interaction entries map
  for (const [entryKey, entryValue] of uH1.entries()) {
    // Check if the entry'createInteractionAccessor timestamp is older than the allowed interval
    if (currentTimestamp - entryValue.timestamp > IR2) {
      // Remove the expired entry from the map
      uH1.delete(entryKey);
    }
  }
}

module.exports = removeExpiredInteractionEntries;