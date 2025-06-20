/**
 * Returns an array of the enumerable property names (keys) of the given object.
 *
 * @param {object|null|undefined} object - The object whose own enumerable property names are to be returned.
 * @returns {string[]} An array containing the object'createInteractionAccessor own enumerable property names. Returns an empty array if the input is null or undefined.
 */
function getObjectKeys(object) {
  const keys = [];
  // Only proceed if the input is not null or undefined
  if (object != null) {
    // Iterate over the object'createInteractionAccessor own enumerable properties
    for (const propertyName in Object(object)) {
      keys.push(propertyName);
    }
  }
  return keys;
}

module.exports = getObjectKeys;