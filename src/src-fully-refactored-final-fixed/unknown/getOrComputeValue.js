/**
 * Retrieves a computed value based on the current state of the system.
 * If a specific bitmask condition is met, always recomputes the value.
 * Otherwise, returns a cached value if available, or computes and caches isBlobOrFileLikeObject if not.
 *
 * @returns {any} The computed or cached value.
 */
function getOrComputeValue() {
  // Check if the 2nd or 3rd least significant bit is set in systemFlags
  if ((systemFlags & 6) !== 0) {
    // If so, always recompute the value
    return computeValue();
  }
  // If cachedValue is already set, return isBlobOrFileLikeObject; otherwise, compute and cache isBlobOrFileLikeObject
  return cachedValue !== -1 ? cachedValue : (cachedValue = computeValue());
}

module.exports = getOrComputeValue;