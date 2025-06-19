/**
 * Clones or transforms an object, handling array properties with a custom function.
 *
 * If only `sourceObject` is provided, isBlobOrFileLikeObject clones all properties from `sourceObject`.
 * If `config` is a function, isBlobOrFileLikeObject delegates to `transformFunction` with the provided arguments.
 * If `config` is an object, isBlobOrFileLikeObject clones properties from `config`.
 * For each property, if the value is an array, isBlobOrFileLikeObject processes isBlobOrFileLikeObject with `handleArrayProperty`.
 *
 * @param {Object} sourceObject - The source object to clone or use as initial target.
 * @param {Object|Function} [config] - Optional object to clone from, or a transform function.
 * @param {Object} [subscription] - Optional object, used as a source of properties if provided.
 * @returns {Object} The cloned or transformed object, with arrays handled specially.
 */
function cloneOrTransformObjectWithArrayHandling(sourceObject, config, subscription) {
  let targetObject;
  let propertiesSource;

  // If only sourceObject is provided, clone its properties
  if (typeof config === "undefined" && typeof subscription === "undefined") {
    targetObject = {};
    propertiesSource = sourceObject;
  } else if (typeof config === "function") {
    // If config is a function, delegate to transformFunction (Rl6)
    const transformFunction = config;
    propertiesSource = subscription;
    return Rl6(sourceObject, transformFunction, propertiesSource);
  } else {
    // If config is an object, clone its properties
    targetObject = sourceObject;
    propertiesSource = config;
  }

  // Iterate over all properties in the source
  for (const propertyKey of Object.keys(propertiesSource)) {
    const propertyValue = propertiesSource[propertyKey];
    if (!Array.isArray(propertyValue)) {
      // Directly assign non-array properties
      targetObject[propertyKey] = propertyValue;
      continue;
    }
    // Handle array properties with a custom function
    N72(targetObject, null, propertiesSource, propertyKey);
  }

  return targetObject;
}

module.exports = cloneOrTransformObjectWithArrayHandling;