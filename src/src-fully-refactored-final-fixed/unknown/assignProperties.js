/**
 * Copies enumerable own properties from one or more source objects to a target object.
 *
 * @param {Object} target - The target object to which properties will be assigned.
 * @param {...Object} sources - One or more source objects whose properties will be copied to the target.
 * @returns {Object} The modified target object with assigned properties.
 */
function assignProperties(target, ...sources) {
  // Iterate over each source object provided after the target
  for (const source of sources) {
    // Only copy own properties (not inherited ones)
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
}

module.exports = assignProperties;