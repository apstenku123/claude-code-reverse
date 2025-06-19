/**
 * Finds and returns the best matching item from a list based on a test and comparison logic.
 *
 * @param {Array<any>} items - The array of items to search through.
 * @param {any} testConfig - Configuration or criteria used to initialize the tester.
 * @param {any} subscription - Additional context or subscription information used by the tester and comparator.
 * @returns {any|null} The best matching item according to the test and comparison logic, or null if none found or on error.
 */
function findBestMatchingItem(items, testConfig, subscription) {
  let bestMatch = null;
  let bestComparator = null;
  let tester = null;

  try {
    // Initialize the tester with the provided configuration and subscription
    tester = new mL6(testConfig, subscription);
  } catch (error) {
    // If tester initialization fails, return null
    return null;
  }

  // Iterate through all items to find the best match
  items.forEach(item => {
    // Check if the item passes the test
    if (tester.test(item)) {
      // If this is the first match or the item is better than the current best, update bestMatch
      if (!bestMatch || bestComparator.compare(item) === -1) {
        bestMatch = item;
        bestComparator = new hL6(bestMatch, subscription);
      }
    }
  });

  return bestMatch;
}

module.exports = findBestMatchingItem;