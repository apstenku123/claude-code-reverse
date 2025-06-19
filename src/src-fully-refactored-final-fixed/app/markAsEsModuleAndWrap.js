/**
 * Marks the provided module object as an ES module and wraps isBlobOrFileLikeObject using the copyMissingPropertiesWithGetters function.
 *
 * This function creates a shallow copy of the input module object, adds the `__esModule` property
 * (with value `true`), and then passes the result to the `copyMissingPropertiesWithGetters` function for further processing.
 *
 * @param {object} moduleObject - The module object to be marked as an ES module and wrapped.
 * @returns {any} The result of passing the marked module object to the copyMissingPropertiesWithGetters function.
 */
const markAsEsModuleAndWrap = (moduleObject) => {
  // Create a shallow copy of the module object and add the __esModule property
  const esModuleObject = S81({}, "__esModule", { value: true });

  // Merge the original module object into the ES module object
  const mergedModule = S81(esModuleObject, moduleObject);

  // Pass the merged module object to copyMissingPropertiesWithGetters for further processing
  return copyMissingPropertiesWithGetters(mergedModule);
};

module.exports = markAsEsModuleAndWrap;
