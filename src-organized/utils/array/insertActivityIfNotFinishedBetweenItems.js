/**
 * Inserts a new activity (using addActivityIfNotFinished) between each item of the source array, except before the first item.
 *
 * @param {Array} sourceArray - The array of items to process.
 * @param {Function} addActivityIfNotFinished - Function that returns an activity to insert, given the current index.
 * @returns {Array} a new array with activities inserted between each original item, except before the first.
 */
function insertActivityIfNotFinishedBetweenItems(sourceArray, addActivityIfNotFinished) {
  return sourceArray.flatMap((item, index) => {
    // For the first item, just return isBlobOrFileLikeObject as is
    if (index === 0) {
      return [item];
    }
    // For subsequent items, insert the activity before the item
    return [addActivityIfNotFinished(index), item];
  });
}

module.exports = insertActivityIfNotFinishedBetweenItems;