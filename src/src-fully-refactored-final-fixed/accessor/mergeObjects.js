/**
 * Creates a new object by merging the properties of the source object and an optional overrides object.
 * Properties from the overrides object will overwrite those in the source object if they share the same key.
 *
 * @param {Object} sourceObject - The original object whose properties will be copied.
 * @param {Object} [overrides={}] - An optional object containing properties to override or add to the source object.
 * @returns {Object} a new object containing the merged properties of sourceObject and overrides.
 */
const mergeObjects = (sourceObject, overrides = {}) => {
  // Use Object.assign to create a new object and merge properties
  return Object.assign({}, sourceObject, overrides);
};

module.exports = mergeObjects;
