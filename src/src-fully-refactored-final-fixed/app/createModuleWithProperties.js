/**
 * Creates a module-like object from a source value, copying properties as getters and handling default export semantics.
 *
 * @param {any} sourceValue - The value to wrap as a module (could be an object, function, or primitive).
 * @param {boolean} shouldCopyProperties - If true, copies properties from sourceValue to the result object as getters.
 * @param {object} [existingModule] - Optional existing module object to extend; if not provided, a new one is created.
 * @returns {object} The resulting module-like object with copied properties and default export semantics.
 */
function createModuleWithProperties(sourceValue, shouldCopyProperties, existingModule) {
  // If sourceValue is not null/undefined, create a shallow clone of its properties; otherwise, use an empty object
  const moduleObject = sourceValue != null ? Kz4(wz4(sourceValue)) : {};

  // If shouldCopyProperties is true, or sourceValue is falsy, or sourceValue is not an ES module,
  // define the 'default' property on the moduleObject with the value of sourceValue
  if (shouldCopyProperties || !sourceValue || !sourceValue.__esModule) {
    $n(moduleObject, "default", {
      value: sourceValue,
      enumerable: true
    });
  }

  // Copy all own properties from sourceValue to moduleObject as getters (unless already present or excluded)
  return copyPropertiesWithGetters(moduleObject, sourceValue);
}

module.exports = createModuleWithProperties;