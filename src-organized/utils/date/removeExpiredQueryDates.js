/**
 * Removes expired entries from the query date map based on a timestamp threshold.
 *
 * Iterates over all entries in the uH1 map and deletes any entry whose timestamp
 * is older than the allowed interval (IR2) compared to the current time.
 *
 * @returns {void} This function does not return anything.
 */
function removeExpiredQueryDates() {
  // Get the current timestamp in milliseconds
  const currentTimestamp = Date.now();

  // Iterate over all entries in the uH1 map
  for (const [entryKey, entryValue] of uH1.entries()) {
    // Check if the entry'createInteractionAccessor timestamp is older than the allowed interval
    if (currentTimestamp - entryValue.timestamp > IR2) {
      // Remove the expired entry from the map
      uH1.delete(entryKey);
    }
  }
}

module.exports = removeExpiredQueryDates;