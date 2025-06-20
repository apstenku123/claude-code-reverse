/**
 * Creates a module-like object from a source value, copying properties as getters and handling default exports.
 *
 * @param {any} sourceValue - The original value or module to wrap.
 * @param {boolean} [shouldCopyProperties] - Whether to copy properties from the source to the result object.
 * @param {object} [resultObject] - Optional result object to populate; if not provided, one is created.
 * @returns {object} The resulting object with properties copied as getters and default export handled.
 */
function createModuleWithGetters(sourceValue, shouldCopyProperties, resultObject) {
  // If sourceValue is not null or undefined, process isBlobOrFileLikeObject; otherwise, use an empty object
  const processedSource = sourceValue != null ? ch6(nh6(sourceValue)) : {};
  // Use provided resultObject or assign processedSource
  const targetObject = resultObject || processedSource;

  // If shouldCopyProperties is true, or sourceValue is falsy, or sourceValue is not an ES module,
  // define a 'default' property on the targetObject pointing to sourceValue
  if (shouldCopyProperties || !sourceValue || !sourceValue.__esModule) {
    qt(targetObject, "default", {
      value: sourceValue,
      enumerable: true
    });
  }

  // Copy all properties from processedSource to targetObject as getters, preserving enumerability
  return copyPropertiesWithGetters(targetObject, processedSource, sourceValue);
}

module.exports = createModuleWithGetters;