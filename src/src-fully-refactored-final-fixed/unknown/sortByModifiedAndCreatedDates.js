/**
 * Sorts an array of objects by their 'modified' and 'created' date properties in descending order.
 *
 * Sorting priority:
 *   1. Most recently modified first
 *   2. If 'modified' dates are equal, most recently created first
 *   3. If both are equal, least recently created first
 *
 * @param {Array<{modified: Date, created: Date}>} items - Array of objects with 'modified' and 'created' Date properties
 * @returns {Array<{modified: Date, created: Date}>} The sorted array
 */
function sortByModifiedAndCreatedDates(items) {
  return items.sort((firstItem, secondItem) => {
    // Compare by 'modified' date (descending)
    const modifiedDifference = secondItem.modified.getTime() - firstItem.modified.getTime();
    if (modifiedDifference !== 0) {
      return modifiedDifference;
    }
    // If 'modified' dates are equal, compare by 'created' date (descending)
    const createdDifference = secondItem.created.getTime() - firstItem.created.getTime();
    if (createdDifference !== 0) {
      return createdDifference;
    }
    // If both dates are equal, compare by 'created' date (ascending)
    return firstItem.created.getTime() - secondItem.created.getTime();
  });
}

module.exports = sortByModifiedAndCreatedDates;