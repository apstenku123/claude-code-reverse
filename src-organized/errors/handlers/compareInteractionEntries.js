/**
 * Compares two interaction entry objects for sorting purposes.
 *
 * The comparison is performed first by the mapped status order (using Yn0),
 * and if the statuses are equal, by the mapped priority order (using Wn0).
 *
 * @param {Object} firstEntry - The first interaction entry to compare.
 * @param {Object} secondEntry - The second interaction entry to compare.
 * @returns {number} Returns a negative number if firstEntry should come before secondEntry,
 *                  a positive number if after, or 0 if they are considered equal.
 */
function compareInteractionEntries(firstEntry, secondEntry) {
  // Compare by mapped status order
  const statusOrderDifference = Yn0[firstEntry.status] - Yn0[secondEntry.status];
  if (statusOrderDifference !== 0) {
    return statusOrderDifference;
  }

  // If statuses are equal, compare by mapped priority order
  return Wn0[firstEntry.priority] - Wn0[secondEntry.priority];
}

module.exports = compareInteractionEntries;
