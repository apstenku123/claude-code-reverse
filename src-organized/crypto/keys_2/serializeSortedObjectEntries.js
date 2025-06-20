/**
 * Serializes the entries of an object as a JSON string, with keys sorted alphabetically.
 *
 * @param {Object} objectToSerialize - The object whose entries will be serialized.
 * @returns {string} a JSON string representing the sorted [key, value] pairs of the object, or an empty string if the object has no keys.
 */
function serializeSortedObjectEntries(objectToSerialize) {
  // Get all enumerable own property keys of the object
  const objectKeys = Object.keys(objectToSerialize);

  // If the object has no keys, return an empty string
  if (objectKeys.length === 0) {
    return "";
  }

  // Sort the keys alphabetically
  const sortedKeys = objectKeys.sort();

  // Map each key to a [key, value] pair
  const sortedEntries = sortedKeys.map((key) => [key, objectToSerialize[key]]);

  // Serialize the array of [key, value] pairs as a JSON string
  return JSON.stringify(sortedEntries);
}

module.exports = serializeSortedObjectEntries;