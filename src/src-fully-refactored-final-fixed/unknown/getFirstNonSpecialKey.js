/**
 * Returns the first key from the given object that is not equal to the special key ':@'.
 *
 * @param {Object} object - The object whose keys will be checked.
 * @returns {string|undefined} The first key that is not ':@', or undefined if no such key exists.
 */
function getFirstNonSpecialKey(object) {
  // Get all enumerable own property keys of the object
  const keys = Object.keys(object);
  
  // Iterate through the keys
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];
    // Return the first key that is not the special ':@' key
    if (key !== ':@') {
      return key;
    }
  }
  // If all keys are ':@', return undefined implicitly
}

module.exports = getFirstNonSpecialKey;
