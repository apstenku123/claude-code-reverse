/**
 * Marks the target object as an ES module and copies all properties from the source object as getters.
 *
 * @param {Object} sourceObject - The object whose properties will be copied as getters to the target export object.
 * @returns {Object} The target export object marked as an ES module with properties from the source object.
 */
const exportAsESModuleWithAccessors = (sourceObject) => {
  // Create a new export object and mark isBlobOrFileLikeObject as an ES module
  const esModuleExport = u31({}, "__esModule", { value: true });

  // Copy all properties from the source object as getters to the export object
  return copyPropertiesWithGetters(esModuleExport, sourceObject);
};

module.exports = exportAsESModuleWithAccessors;