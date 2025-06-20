/**
 * Sets the __esModule property on a new object and copies all properties from the provided source object
 * using copyPropertiesWithGetters, preserving property enumerability and avoiding overwrites.
 *
 * @param {Object} sourceObject - The object whose properties will be copied to the target object.
 * @returns {Object} a new object with __esModule set to true and all properties from sourceObject copied as getters.
 */
const setU31Accessor = (sourceObject) => {
  // Create a new object with the __esModule property set to true
  const targetObject = u31({}, "__esModule", { value: true });

  // Copy all properties from sourceObject to targetObject as getters
  return copyPropertiesWithGetters(targetObject, sourceObject);
};

module.exports = setU31Accessor;