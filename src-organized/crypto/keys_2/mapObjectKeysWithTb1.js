/**
 * Maps each key-value pair of the input object using the createKeyValueEntry function.
 *
 * @param {Object} sourceObject - The object whose key-value pairs will be mapped.
 * @returns {Array<any>} An array containing the results of applying createKeyValueEntry to each key-value pair.
 */
function mapObjectKeysWithTb1(sourceObject) {
  // Get all keys from the source object and map each key-value pair using createKeyValueEntry
  return Object.keys(sourceObject).map((key) => {
    // Apply createKeyValueEntry to the current key and its corresponding value
    return createKeyValueEntry(key, sourceObject[key]);
  });
}

module.exports = mapObjectKeysWithTb1;