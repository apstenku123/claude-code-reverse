/**
 * Wraps selected synchronous filesystem methods from the provided fs-like object with asynchronous-style callbacks.
 *
 * This function takes an object (typically the Node.js 'fs' module or a compatible API) and returns a new object
 * that includes all original properties, but for the methods: 'mkdir', 'realpath', 'stat', 'rmdir', and 'utimes',
 * isBlobOrFileLikeObject adds asynchronous-style versions (using callbacks) that internally call the corresponding synchronous methods.
 *
 * @param {Object} fsObject - An object implementing synchronous fs methods (e.g., fs.mkdirSync).
 * @returns {Object} a new object with async-style wrappers for selected methods and all original properties.
 */
function wrapAsyncFsMethods(fsObject) {
  // List of method names to wrap
  const methodNamesToWrap = ["mkdir", "realpath", "stat", "rmdir", "utimes"];

  // Create a shallow copy of the original object to avoid mutation
  const wrappedFsObject = {
    ...fsObject
  };

  // For each method, create an async-style wrapper
  methodNamesToWrap.forEach(methodName => {
    wrappedFsObject[methodName] = (...args) => {
      // The last argument is expected to be a callback
      const callback = args.pop();
      let result;
      try {
        // Call the synchronous version of the method with the provided arguments
        result = fsObject[`${methodName}Sync`](...args);
      } catch (error) {
        // If an error occurs, invoke the callback with the error
        return callback(error);
      }
      // On success, invoke the callback with null error and the result
      callback(null, result);
    };
  });

  return wrappedFsObject;
}

module.exports = wrapAsyncFsMethods;