/**
 * Checks if a subscription map contains an entry for a given object and key.
 *
 * @param {Object} targetObject - The object to check for in the subscription map.
 * @param {string|number|symbol} propertyKey - The property key to check for in the subscription map.
 * @param {Map<any, Array<{key: string|number|symbol, obj: Object}>>} subscriptionMap - a map where each value is an array of entries, each entry containing a 'key' and 'obj'.
 * @returns {boolean} Returns true if an entry exists in the subscription map for the given object and key, otherwise false.
 */
function hasMatchingEntryForKeyAndObject(targetObject, propertyKey, subscriptionMap) {
  // Retrieve the array of entries for the given propertyKey from the subscription map
  const entries = subscriptionMap.get(targetObject[propertyKey]) || [];

  // Iterate through each entry to check for a matching key and object
  for (let i = 0, len = entries.length; i < len; i++) {
    const entry = entries[i];
    // Check if both the key and object match
    if (entry.key === propertyKey && entry.obj === targetObject) {
      return true;
    }
  }
  // No matching entry found
  return false;
}

module.exports = hasMatchingEntryForKeyAndObject;