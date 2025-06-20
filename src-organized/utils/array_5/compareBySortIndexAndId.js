/**
 * Compares two objects based on their sortIndex property, and if equal, by their id property.
 * Useful for sorting arrays of objects where primary order is determined by sortIndex and secondary by id.
 *
 * @param {Object} firstItem - The first object to compare. Must have 'sortIndex' and 'id' properties.
 * @param {Object} secondItem - The second object to compare. Must have 'sortIndex' and 'id' properties.
 * @returns {number} Returns a negative number if firstItem should come before secondItem, positive if after, or 0 if equal.
 */
function compareBySortIndexAndId(firstItem, secondItem) {
  // Compare by sortIndex first
  const sortIndexDifference = firstItem.sortIndex - secondItem.sortIndex;
  // If sortIndex is different, return the difference
  if (sortIndexDifference !== 0) {
    return sortIndexDifference;
  }
  // If sortIndex is the same, compare by id
  return firstItem.id - secondItem.id;
}

module.exports = compareBySortIndexAndId;
