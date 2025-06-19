/**
 * Creates a module-like object from a given source, copying properties as getters and handling default export semantics.
 *
 * @param {any} sourceObject - The object to wrap as a module-like object (commonly an imported module or value).
 * @param {boolean} [shouldCopyProperties] - If true, copies properties from the source to the result object as getters. If false, only sets the default export.
 * @returns {object} The resulting module-like object with copied properties and/or a default export.
 */
function createModuleLikeObject(sourceObject, shouldCopyProperties) {
  // If sourceObject is not null/undefined, create a shallow clone using SX4(kX4(sourceObject)), else use an empty object
  let moduleObject = sourceObject != null ? SX4(kX4(sourceObject)) : {};

  // If shouldCopyProperties is falsy, or sourceObject is falsy, or sourceObject is not an ES module,
  // define a 'default' property on the moduleObject with the value of sourceObject
  if (
    !shouldCopyProperties || !sourceObject || !sourceObject.__esModule
  ) {
    Cn(moduleObject, "default", {
      value: sourceObject,
      enumerable: true
    });
  }

  // Copy all own properties from sourceObject to moduleObject as getters, except those already present
  // or excluded by copyMissingPropertiesWithGetters logic
  return copyMissingPropertiesWithGetters(moduleObject, sourceObject);
}

module.exports = createModuleLikeObject;