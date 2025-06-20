/**
 * Wraps selected synchronous filesystem methods with asynchronous callback-style wrappers.
 *
 * Given an object (typically a Node.js 'fs' module or similar), this function returns a copy
 * of that object with five methods ('mkdir', 'realpath', 'stat', 'rmdir', 'utimes') replaced.
 * Each replaced method becomes an async-style function that accepts the same arguments as the
 * original, except the last argument must be a callback (err, result). The synchronous version
 * is called internally, and the callback is invoked with the result or error.
 *
 * @param {Object} fsLikeObject - An object containing synchronous filesystem methods (e.g., fs).
 * @returns {Object} a shallow copy of the input object with async-style wrappers for selected methods.
 */
function wrapAsyncFsMethodsWithCallbacks(fsLikeObject) {
  // List of method names to wrap
  const methodNamesToWrap = ["mkdir", "realpath", "stat", "rmdir", "utimes"];
  // Create a shallow copy to avoid mutating the original object
  const wrappedFsObject = { ...fsLikeObject };

  methodNamesToWrap.forEach((methodName) => {
    // Replace each method with a callback-style wrapper
    wrappedFsObject[methodName] = (...args) => {
      // Extract the callback (assumed to be the last argument)
      const callback = args.pop();
      let result;
      try {
        // Call the synchronous version of the method
        result = fsLikeObject[`${methodName}Sync`](...args);
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

module.exports = wrapAsyncFsMethodsWithCallbacks;