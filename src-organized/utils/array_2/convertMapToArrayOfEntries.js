/**
 * Converts a Map-like object into an array of [key, value] pairs.
 *
 * @param {Map|Object} mapSource - The Map or Map-like object to convert.
 * @returns {Array<Array>} An array where each element is a [key, value] pair from the mapSource.
 */
function convertMapToArrayOfEntries(mapSource) {
  // Initialize the index for inserting into the result array
  let entryIndex = -1;
  // Pre-allocate the result array with the same size as the mapSource
  const entriesArray = Array(mapSource.size);

  // Iterate over each entry in the mapSource
  mapSource.forEach(function (value, key) {
    // Increment the index and assign the [key, value] pair
    entriesArray[++entryIndex] = [key, value];
  });

  return entriesArray;
}

module.exports = convertMapToArrayOfEntries;