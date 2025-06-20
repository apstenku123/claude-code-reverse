/**
 * Retrieves a value associated with a given key from various data structures (array, Map-like object, or plain object), using case-insensitive key matching.
 *
 * @param {Array|Object} source - The data structure to search. Can be:
 *   - An array of alternating [key, value, key, value, ...] pairs
 *   - An object with a .get() method (e.g., Map)
 *   - a plain object
 * @param {string} key - The key to search for (case-insensitive)
 * @returns {any} The value associated with the key, or undefined if not found
 */
function getValueByCaseInsensitiveKey(source, key) {
  // If source is an array of [key, value, ...] pairs
  if (Array.isArray(source)) {
    for (let index = 0; index < source.length; index += 2) {
      // Compare keys in a case-insensitive manner
      if (
        typeof source[index] === 'string' &&
        source[index].toLocaleLowerCase() === key.toLocaleLowerCase()
      ) {
        return source[index + 1];
      }
    }
    // Key not found in array
    return undefined;
  }
  // If source has a .get() method (e.g., Map)
  if (typeof source.get === 'function') {
    return source.get(key);
  }
  // Otherwise, treat source as a plain object; use Gu0 to normalize keys
  // (Assumes Gu0 returns an object with lowercased keys)
  return Gu0(source)[key.toLocaleLowerCase()];
}

module.exports = getValueByCaseInsensitiveKey;