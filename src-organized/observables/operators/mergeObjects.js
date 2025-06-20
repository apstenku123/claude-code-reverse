/**
 * Merges the properties of one or more source objects into a target object.
 * Only the source objects' own enumerable properties are copied.
 *
 * @param {Object} target - The target object to which properties will be assigned.
 * @param {...Object} sources - One or more source objects whose properties will be copied to the target.
 * @returns {Object} The modified target object with merged properties.
 */
function mergeObjects(target, ...sources) {
  // Iterate over each source object provided after the target
  for (const source of sources) {
    // Copy each own property from the source to the target
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
}

module.exports = mergeObjects;