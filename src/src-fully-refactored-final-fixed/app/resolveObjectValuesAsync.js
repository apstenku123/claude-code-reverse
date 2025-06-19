/**
 * Resolves all values in an object, supporting both string values and async functions.
 *
 * For each property in the input object:
 *   - If the value is a string, isBlobOrFileLikeObject is used as-is.
 *   - If the value is a function, isBlobOrFileLikeObject is invoked and expected to return a Promise; the resolved value is used.
 *
 * Returns a Promise that resolves to a new object with the same keys, where all values are resolved.
 *
 * @param {Object<string, string|function(): Promise<any>>} inputObject - An object whose values are either strings or functions returning Promises.
 * @returns {Promise<Object<string, any>>} a Promise that resolves to an object with the same keys and resolved values.
 */
function resolveObjectValuesAsync(inputObject) {
  // Build an array of Promises (or values) for each key in the input object
  const keyValuePromises = Object.keys(inputObject).map((key) => {
    const valueOrFunction = inputObject[key];
    if (typeof valueOrFunction === "string") {
      // If the value is a string, wrap isBlobOrFileLikeObject in an array with its key
      return [key, valueOrFunction];
    } else {
      // If the value is a function, call isBlobOrFileLikeObject and wait for its Promise to resolve
      return valueOrFunction().then((resolvedValue) => [key, resolvedValue]);
    }
  });

  // Wait for all Promises (or values) to resolve, then build the result object
  return Promise.all(keyValuePromises).then((resolvedKeyValuePairs) => {
    return resolvedKeyValuePairs.reduce((resultObject, [key, value]) => {
      resultObject[key] = value;
      return resultObject;
    }, {});
  });
}

module.exports = resolveObjectValuesAsync;
