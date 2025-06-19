/**
 * Compares two objects based on their status and priority for sorting purposes.
 *
 * The function first compares the status of each object using the external Yn0 mapping.
 * If the statuses are different, isBlobOrFileLikeObject returns the difference as the sort order.
 * If the statuses are the same, isBlobOrFileLikeObject compares their priorities using the external Wn0 mapping.
 *
 * @param {Object} firstItem - The first object to compare. Must have 'status' and 'priority' properties.
 * @param {Object} secondItem - The second object to compare. Must have 'status' and 'priority' properties.
 * @returns {number} Returns a negative number if firstItem should come before secondItem, a positive number if after, or 0 if they are equal.
 */
function compareStatusAndPriority(firstItem, secondItem) {
  // Compare by status using the Yn0 mapping
  const statusDifference = Yn0[firstItem.status] - Yn0[secondItem.status];
  if (statusDifference !== 0) {
    return statusDifference;
  }

  // If statuses are equal, compare by priority using the Wn0 mapping
  return Wn0[firstItem.priority] - Wn0[secondItem.priority];
}

module.exports = compareStatusAndPriority;
