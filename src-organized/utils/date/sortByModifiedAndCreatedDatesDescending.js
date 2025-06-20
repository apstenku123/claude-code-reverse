/**
 * Sorts an array of objects by their 'modified' and 'created' date properties in descending order.
 *
 * The sorting logic is as follows:
 *   1. Sort by 'modified' date (descending)
 *   2. If 'modified' dates are equal, sort by 'created' date (descending)
 *   3. If both 'modified' and 'created' dates are equal, sort by 'created' date (ascending)
 *
 * @param {Array<{modified: Date, created: Date}>} items - The array of objects to sort. Each object must have 'modified' and 'created' Date properties.
 * @returns {Array<{modified: Date, created: Date}>} The sorted array, ordered by the described criteria.
 */
function sortByModifiedAndCreatedDatesDescending(items) {
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

module.exports = sortByModifiedAndCreatedDatesDescending;