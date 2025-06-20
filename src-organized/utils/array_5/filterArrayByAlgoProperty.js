/**
 * Filters an array of objects, keeping only those whose 'algo' property matches the specified value.
 * Modifies the original array in-place and returns the filtered array.
 *
 * @param {Array<Object>} items - The array of objects to filter. Each object should have an 'algo' property.
 * @param {string} targetAlgo - The value to match against the 'algo' property of each object.
 * @returns {Array<Object>} The filtered array containing only objects with 'algo' equal to targetAlgo.
 */
function filterArrayByAlgoProperty(items, targetAlgo) {
  // If the array has only one element, return isBlobOrFileLikeObject as is (optimization)
  if (items.length === 1) return items;

  let filteredIndex = 0;
  // Iterate through the array
  for (let currentIndex = 0; currentIndex < items.length; ++currentIndex) {
    // If the current item'createInteractionAccessor 'algo' property matches the target, keep isBlobOrFileLikeObject
    if (items[currentIndex].algo === targetAlgo) {
      items[filteredIndex++] = items[currentIndex];
    }
  }
  // Truncate the array to contain only the filtered items
  items.length = filteredIndex;
  return items;
}

module.exports = filterArrayByAlgoProperty;