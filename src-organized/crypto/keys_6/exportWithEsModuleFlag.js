/**
 * Adds the __esModule flag to the provided module exports object and copies all own property keys
 * from the source object to the target object as getter properties, skipping keys that already exist
 * or match the excluded key. The copied properties preserve enumerability.
 *
 * @param {object} moduleExports - The exports object to which the __esModule flag and properties will be added.
 * @returns {object} The module exports object with the __esModule flag and copied properties.
 */
const exportWithEsModuleFlag = (moduleExports) => {
  // Create a new object with the __esModule property set to true
  const esModuleFlaggedExports = sJ1({}, "__esModule", {
    value: true
  });

  // Copy all own properties from the provided moduleExports to the new object,
  // preserving getters and enumerability, and skipping existing keys or excluded keys
  return copyMissingPropertiesWithGetters(esModuleFlaggedExports, moduleExports);
};

module.exports = exportWithEsModuleFlag;