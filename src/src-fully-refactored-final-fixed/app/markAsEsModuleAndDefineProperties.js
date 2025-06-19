/**
 * Marks the provided object as an ES module and defines its properties on a new target object.
 *
 * This function creates a new object with the `__esModule` property set to true, then copies all enumerable properties
 * from the provided source object onto this new object using `defineMissingPropertiesFromSource`.
 *
 * @param {object} sourceObject - The object whose properties should be defined on the ES module-marked target.
 * @returns {object} a new object with `__esModule: true` and all properties from the source object defined.
 */
function markAsEsModuleAndDefineProperties(sourceObject) {
  // Create a new object with __esModule: true
  const esModuleTarget = e31({}, "__esModule", { value: true });

  // Define all properties from the source object onto the new ES module target
  return defineMissingPropertiesFromSource(esModuleTarget, sourceObject);
}

// Dependency injection for clarity and testability
// e31: Utility function to create an object with a specific property
// defineMissingPropertiesFromSource: Copies properties as getters, skipping existing or excluded keys

module.exports = markAsEsModuleAndDefineProperties;