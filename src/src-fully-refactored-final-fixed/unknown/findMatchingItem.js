/**
 * Searches through an array of items and returns the first item that matches a given condition.
 * The matching condition is determined by the external function `matchesNodeNameFilter`, which takes the current item,
 * a configuration object, and a subscription object as arguments.
 *
 * @param {Array<any>} items - The array of items to search through.
 * @param {Object} config - The configuration object used by the matching function.
 * @param {Object} subscription - The subscription or context object used by the matching function.
 * @returns {any|undefined} The first item that matches the condition, or undefined if no match is found.
 */
function findMatchingItem(items, config, subscription) {
  // Iterate through each item in the array
  for (let index = 0; index < items.length; index++) {
    const currentItem = items[index];
    // Check if the current item matches the condition using matchesNodeNameFilter
    if (matchesNodeNameFilter(currentItem, config, subscription)) {
      return currentItem; // Return the first matching item
    }
  }
  // Return undefined if no matching item is found
  return undefined;
}

module.exports = findMatchingItem;