/**
 * Adds the __esModule flag to an object and copies all own properties from the source object
 * to the target object as getters, skipping properties that already exist on the target or match a specific excluded key.
 * The __esModule flag is set to true, indicating the object is an ES module.
 *
 * @param {Object} sourceObject - The object whose properties will be copied to the target object.
 * @returns {Object} The target object with the __esModule flag and copied properties.
 */
const addEsModuleFlagAndCopyProperties = (sourceObject) => {
  // Create a new object with the __esModule flag set to true
  const targetObject = WJ1({}, "__esModule", { value: true });

  // Copy all own properties from sourceObject to targetObject as getters,
  // skipping properties that already exist on the target or match a specific excluded key
  return copyMissingPropertiesWithGetters(targetObject, sourceObject);
};

module.exports = addEsModuleFlagAndCopyProperties;
