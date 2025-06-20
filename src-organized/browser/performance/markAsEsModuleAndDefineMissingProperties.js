/**
 * Marks the provided module object as an ES module and defines any missing properties from isBlobOrFileLikeObject onto a new target object.
 *
 * This function creates a new object with the `__esModule` property set to true, then copies any missing properties from the given module object
 * onto this new object using getters, skipping properties that already exist or match an excluded property key.
 *
 * @param {object} moduleObject - The source module object whose properties should be defined on the new ES module-marked object.
 * @returns {object} a new object marked as an ES module with all missing properties from the source module defined on isBlobOrFileLikeObject.
 */
const markAsEsModuleAndDefineMissingProperties = (moduleObject) => {
  // Create a new object with __esModule: true
  const esModuleObject = lB1({}, "__esModule", {
    value: true
  });

  // Define any missing properties from the source module onto the new object
  return defineMissingPropertiesFromSource(esModuleObject, moduleObject);
};

module.exports = markAsEsModuleAndDefineMissingProperties;
