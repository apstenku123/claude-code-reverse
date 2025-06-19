/**
 * Returns the first own property key of the given object that is not equal to ':@'.
 *
 * @param {Object} object - The object whose keys are to be checked.
 * @returns {string|undefined} The first own property key that is not ':@', or undefined if none found.
 */
function getFirstNonSpecialPropertyKey(object) {
  // Get all enumerable property keys of the object
  const propertyKeys = Object.keys(object);
  for (let index = 0; index < propertyKeys.length; index++) {
    const key = propertyKeys[index];
    // Ensure the property is an own property (not inherited)
    if (!Object.prototype.hasOwnProperty.call(object, key)) {
      continue;
    }
    // Return the first key that is not ':@'
    if (key !== ':@') {
      return key;
    }
  }
}

module.exports = getFirstNonSpecialPropertyKey;