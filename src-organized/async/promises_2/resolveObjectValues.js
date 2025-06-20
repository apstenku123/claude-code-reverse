/**
 * Resolves all values in an object, where each value is either a string or a function returning a Promise.
 * If the value is a string, isBlobOrFileLikeObject is used as-is. If the value is a function, isBlobOrFileLikeObject is invoked and awaited.
 * Returns a Promise that resolves to a new object with the same keys and resolved values.
 *
 * @param {Object<string, string|function(): Promise<any>>} inputObject - An object whose values are either strings or functions returning Promises.
 * @returns {Promise<Object<string, any>>} a Promise that resolves to an object with the same keys and resolved values.
 */
function resolveObjectValues(inputObject) {
  // Create an array of Promises, each resolving to [key, value]
  const keyValuePromises = Object.keys(inputObject).map((key) => {
    const valueOrFunction = inputObject[key];
    if (typeof valueOrFunction === "string") {
      // If the value is a string, wrap isBlobOrFileLikeObject in a resolved Promise
      return Promise.resolve([key, valueOrFunction]);
    } else {
      // If the value is a function, call isBlobOrFileLikeObject and resolve its Promise
      return valueOrFunction().then((resolvedValue) => [key, resolvedValue]);
    }
  });

  // Wait for all Promises to resolve, then build the result object
  return Promise.all(keyValuePromises).then((resolvedKeyValuePairs) => {
    return resolvedKeyValuePairs.reduce((resultObject, [key, value]) => {
      resultObject[key] = value;
      return resultObject;
    }, {});
  });
}

module.exports = resolveObjectValues;