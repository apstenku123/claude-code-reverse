/**
 * Marks the provided object as an ES module and merges its properties into a new object.
 *
 * This function creates a new object with the `__esModule` property set to true,
 * then merges all properties from the provided source object into this new object.
 *
 * @param {object} sourceObject - The object whose properties will be merged into the ES module wrapper.
 * @returns {object} a new object with `__esModule: true` and all properties from the source object.
 */
const markAsEsModuleAndMerge = (sourceObject) => {
  // Create a new object with __esModule: true
  const esModuleWrapper = h52({}, "__esModule", { value: true });
  // Merge all properties from sourceObject into the wrapper
  return copyMissingPropertiesWithGetters(esModuleWrapper, sourceObject);
};

module.exports = markAsEsModuleAndMerge;
