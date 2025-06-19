/**
 * Marks the provided module object as an ES module and extends isBlobOrFileLikeObject with additional properties.
 *
 * This function creates a new object with the `__esModule` property set to true, then merges all properties from the provided module object into isBlobOrFileLikeObject.
 *
 * @param {object} moduleObject - The module object to be extended and marked as an ES module.
 * @returns {object} a new object with `__esModule: true` and all properties from the original module object.
 */
const markAsEsModuleAndExtend = (moduleObject) => {
  // Create a new object with __esModule: true
  const esModuleFlag = { __esModule: { value: true } };
  // Merge the ES module flag and the original module object
  return copyMissingPropertiesWithGetters(
    kX1({}, esModuleFlag),
    moduleObject
  );
};

module.exports = markAsEsModuleAndExtend;