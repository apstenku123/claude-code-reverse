/**
 * Enhances a given object (typically a Node.js fs module) by adding asynchronous (callback-based) versions
 * of selected synchronous file system methods. The new methods mimic Node.js-style async APIs by wrapping
 * their synchronous counterparts and invoking a callback with either an error or the result.
 *
 * @param {Object} fsModule - An object containing synchronous file system methods (e.g., fs module).
 * @returns {Object} a new object with added async versions of selected fs methods.
 */
function addAsyncFsMethods(fsModule) {
  // List of fs method base names to wrap
  const methodNames = ["mkdir", "realpath", "stat", "rmdir", "utimes"];

  // Clone the original fsModule to avoid mutating the input
  const enhancedFsModule = {
    ...fsModule
  };

  methodNames.forEach((methodName) => {
    // Add an async version for each method
    enhancedFsModule[methodName] = (...args) => {
      // The last argument is expected to be the callback
      const callback = args.pop();
      let result;
      try {
        // Call the synchronous version of the method
        result = fsModule[`${methodName}Sync`](...args);
      } catch (error) {
        // If an error occurs, invoke the callback with the error
        return callback(error);
      }
      // On success, invoke the callback with null error and the result
      callback(null, result);
    };
  });

  return enhancedFsModule;
}

module.exports = addAsyncFsMethods;