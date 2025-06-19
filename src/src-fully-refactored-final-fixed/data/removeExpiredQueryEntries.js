/**
 * Removes expired entries from the uH1 map based on their timestamp.
 *
 * Iterates over all entries in the uH1 map and deletes those whose timestamp
 * is older than the allowed interval (IR2) compared to the current time.
 *
 * @returns {void} This function does not return a value.
 */
function removeExpiredQueryEntries() {
  // Get the current timestamp in milliseconds
  const currentTimestamp = Date.now();

  // Iterate over each entry in the uH1 map
  for (const [entryKey, entryValue] of uH1.entries()) {
    // Check if the entry'createInteractionAccessor timestamp is older than the allowed interval
    if (currentTimestamp - entryValue.timestamp > IR2) {
      // Remove the expired entry from the map
      uH1.delete(entryKey);
    }
  }
}

module.exports = removeExpiredQueryEntries;