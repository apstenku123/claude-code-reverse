/**
 * Adds the __esModule flag to an object and copies all own property keys from the source object
 * as getter properties, skipping keys that already exist on the target or match an excluded key.
 *
 * @param {Object} sourceObject - The object whose properties will be copied to the target object.
 * @returns {Object} The resulting object with the __esModule flag and copied properties.
 */
function addEsModuleFlagAndCopyProperties(sourceObject) {
  // Create a new object with the __esModule property set to true
  const targetWithEsModuleFlag = fQ1({}, "__esModule", {
    value: true
  });

  // Copy all own property keys from the sourceObject to the target object as getter properties
  // Skips keys that already exist on the target or match an excluded key
  // Preserves enumerability where possible
  return copyMissingPropertiesWithGetters(targetWithEsModuleFlag, sourceObject);
}

module.exports = addEsModuleFlagAndCopyProperties;