/**
 * Compares two objects based on their status and priority using external mappings.
 *
 * The function first compares the objects' statuses using the `statusOrderMap`.
 * If the statuses are equal, isBlobOrFileLikeObject compares their priorities using the `priorityOrderMap`.
 *
 * @param {Object} firstItem - The first object to compare. Must have 'status' and 'priority' properties.
 * @param {Object} secondItem - The second object to compare. Must have 'status' and 'priority' properties.
 * @returns {number} Returns a negative number if firstItem < secondItem, positive if firstItem > secondItem, or 0 if equal.
 */
function compareByStatusAndPriority(firstItem, secondItem) {
  // Compare by status using the external status order mapping
  const statusDifference = statusOrderMap[firstItem.status] - statusOrderMap[secondItem.status];
  if (statusDifference !== 0) {
    return statusDifference;
  }
  // If statuses are equal, compare by priority using the external priority order mapping
  return priorityOrderMap[firstItem.priority] - priorityOrderMap[secondItem.priority];
}

module.exports = compareByStatusAndPriority;