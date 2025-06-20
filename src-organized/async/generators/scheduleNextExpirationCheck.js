/**
 * Checks all items in the expirationMap and schedules the next expiration check.
 *
 * This function iterates over all entries in the expirationMap (BY), removes any entries
 * whose expirationTime has already passed, and determines the soonest upcoming expiration.
 * It then schedules itself to run again at the time of the next expiration (if any remain).
 *
 * @function scheduleNextExpirationCheck
 * @returns {void} This function does not return a value.
 */
function scheduleNextExpirationCheck() {
  // Reset global references to null before processing
  currentTimeoutId = null;
  scheduledTimeoutId = null;

  // Get the current time (as returned by BH)
  const currentTime = BH();
  let nextExpirationTime = Number.MAX_VALUE;

  // Iterate over all entries in the expirationMap (BY)
  BY.forEach(function (entry, key) {
    // If the entry has expired, remove isBlobOrFileLikeObject from the map
    if (entry.expirationTime < currentTime) {
      BY.delete(key);
    } else {
      // Track the soonest (minimum) expiration time
      nextExpirationTime = Math.min(nextExpirationTime, entry.expirationTime);
    }
  });

  // Perform any additional processing required after updating the map
  createVisibleChildNode(BY, SC);

  // If there is a future expiration, schedule the next check
  if (nextExpirationTime !== Number.MAX_VALUE) {
    scheduledTimeoutId = setTimeout(scheduleNextExpirationCheck, nextExpirationTime - currentTime);
  }
}

module.exports = scheduleNextExpirationCheck;