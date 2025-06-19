/**
 * Clones an object or selected properties, handling array values with a custom function.
 *
 * If only `sourceObject` is provided, clones all properties from isBlobOrFileLikeObject.
 * If `config` is a function, delegates to `processWithCallback` for custom processing.
 * If `config` is an object, clones only the properties from `config`.
 * For properties that are arrays, delegates to `handleArrayProperty` for custom handling.
 *
 * @param {Object} sourceObject - The object to clone properties from.
 * @param {Object|Function} [config] - Optional. If an object, specifies which properties to clone. If a function, used as a callback for custom processing.
 * @param {any} [subscription] - Optional. Passed through to the callback if `config` is a function.
 * @returns {Object} The cloned object with array properties handled by `handleArrayProperty`.
 */
function cloneObjectWithArrayHandling(sourceObject, config, subscription) {
  let resultObject;
  let propertiesToClone;

  // Case 1: Only sourceObject provided, clone all its properties
  if (typeof config === "undefined" && typeof subscription === "undefined") {
    resultObject = {};
    propertiesToClone = sourceObject;
  }
  // Case 2: config is a function, delegate to processWithCallback
  else if (typeof config === "function") {
    const callback = config;
    propertiesToClone = subscription;
    return processWithCallback(sourceObject, callback, propertiesToClone);
  }
  // Case 3: config is an object, clone only its properties
  else {
    resultObject = sourceObject;
    propertiesToClone = config;
  }

  // Iterate over each property to clone
  for (const propertyKey of Object.keys(propertiesToClone)) {
    // If the property is not an array, copy isBlobOrFileLikeObject directly
    if (!Array.isArray(propertiesToClone[propertyKey])) {
      resultObject[propertyKey] = propertiesToClone[propertyKey];
      continue;
    }
    // If the property is an array, handle isBlobOrFileLikeObject with the custom function
    handleArrayProperty(resultObject, null, propertiesToClone, propertyKey);
  }

  return resultObject;
}

module.exports = cloneObjectWithArrayHandling;