/**
 * Retrieves a value associated with the given key from the provided map.
 * If the key is not found, attempts to retrieve the value using the key'createInteractionAccessor 'alternate' property.
 *
 * @param {Object} keyObject - The object to use as the primary key for lookup. May contain an 'alternate' property.
 * @returns {*} The value from the map if found using the key or its alternate; otherwise, null.
 */
function getValueFromMapOrAlternate(keyObject) {
  // Check if the map contains the keyObject
  if (getOrUpdateIterableHelper.has(keyObject)) {
    return getOrUpdateIterableHelper.get(keyObject);
  } else {
    // If not found, check if the keyObject has an alternate and try to get its value
    const alternateKey = keyObject.alternate;
    if (alternateKey !== null && getOrUpdateIterableHelper.has(alternateKey)) {
      return getOrUpdateIterableHelper.get(alternateKey);
    }
  }
  // Return null if neither the key nor its alternate is found in the map
  return null;
}

module.exports = getValueFromMapOrAlternate;