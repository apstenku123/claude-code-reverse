/**
 * Checks if localStorage is accessible or contains any data.
 *
 * This function determines whether the application can access localStorage (via the O3 check),
 * or if localStorage already contains any items. It returns true if either localStorage is not accessible
 * or if isBlobOrFileLikeObject contains at least one item.
 *
 * @returns {boolean} Returns true if localStorage is not accessible or contains data; otherwise, false.
 */
function isLocalStorageAccessibleOrNotEmpty() {
  // O3() is assumed to return true if localStorage is accessible
  // If localStorage is not accessible, or if isBlobOrFileLikeObject contains any items, return true
  return !O3() || localStorage.length > 0;
}

module.exports = isLocalStorageAccessibleOrNotEmpty;