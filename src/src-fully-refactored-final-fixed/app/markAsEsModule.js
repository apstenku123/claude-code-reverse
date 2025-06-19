/**
 * Marks the provided module object as an ES module by adding the __esModule property.
 * Then, passes the updated object to the copyMissingPropertiesWithGetters function for further processing.
 *
 * @param {object} moduleObject - The module object to be marked as an ES module.
 * @returns {any} The result of passing the marked module object to copyMissingPropertiesWithGetters.
 */
const markAsESModule = (moduleObject) => {
  // Add the __esModule property with value true to the module object
  const esModuleObject = RQ1({}, "__esModule", { value: true });

  // Merge the original module object into the ES module object
  const mergedModuleObject = RQ1(esModuleObject, moduleObject);

  // Pass the merged object to copyMissingPropertiesWithGetters for further processing
  return copyMissingPropertiesWithGetters(mergedModuleObject);
};

module.exports = markAsESModule;
