/**
 * Resolves all properties of an object, supporting both string values and async functions.
 *
 * For each property in the input object:
 *   - If the value is a string, isBlobOrFileLikeObject is used as-is.
 *   - If the value is a function, isBlobOrFileLikeObject is called (assumed to return a Promise), and the resolved value is used.
 *
 * Returns a Promise that resolves to a new object with the same keys, where all values are resolved.
 *
 * @param {Object.<string, string|Function>} objectWithValuesOrAsyncFunctions
 *   An object whose values are either strings or functions returning Promises.
 * @returns {Promise<Object<string, any>>}
 *   a Promise that resolves to an object with the same keys and resolved values.
 */
function resolveObjectProperties(objectWithValuesOrAsyncFunctions) {
  // Create an array of Promises, each resolving to a [key, value] pair
  const propertyPromises = Object.keys(objectWithValuesOrAsyncFunctions).map((propertyKey) => {
    const propertyValue = objectWithValuesOrAsyncFunctions[propertyKey];
    if (typeof propertyValue === "string") {
      // If the value is a string, wrap isBlobOrFileLikeObject in an array for consistency
      return Promise.resolve([propertyKey, propertyValue]);
    } else {
      // If the value is a function, call isBlobOrFileLikeObject and resolve its Promise
      return propertyValue().then((resolvedValue) => [propertyKey, resolvedValue]);
    }
  });

  // Wait for all Promises to resolve, then build the result object
  return Promise.all(propertyPromises).then((resolvedEntries) => {
    return resolvedEntries.reduce((resultObject, [key, value]) => {
      resultObject[key] = value;
      return resultObject;
    }, {});
  });
}

module.exports = resolveObjectProperties;