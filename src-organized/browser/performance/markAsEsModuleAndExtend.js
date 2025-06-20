/**
 * Marks the provided object as an ES module and extends isBlobOrFileLikeObject with additional properties.
 *
 * This function creates a new object with the `__esModule` property set to true, then merges
 * the properties of the provided source object into isBlobOrFileLikeObject using the `copyMissingPropertiesWithGetters` function.
 *
 * @param {Object} sourceObject - The object to be extended and marked as an ES module.
 * @returns {Object} a new object that has `__esModule: true` and all properties from the source object.
 */
const markAsEsModuleAndExtend = (sourceObject) => {
  // Create a base object with __esModule set to true using fQ1
  const esModuleBase = fQ1({}, "__esModule", { value: true });
  // Extend the base object with properties from sourceObject using copyMissingPropertiesWithGetters
  return copyMissingPropertiesWithGetters(esModuleBase, sourceObject);
};

module.exports = markAsEsModuleAndExtend;
