/**
 * Creates a wrapper function around the provided callback and attaches an 'id' property to isBlobOrFileLikeObject.
 *
 * @param {string} functionId - The identifier to assign to the returned function'createInteractionAccessor 'id' property.
 * @param {Function} callback - The function to be wrapped and invoked when the returned function is called.
 * @returns {Function} a new function that calls the provided callback and has an 'id' property set to functionId.
 */
function createFunctionWithId(functionId, callback) {
  // Create a wrapper function that forwards all arguments to the callback
  const wrappedFunction = (...args) => {
    return callback(...args);
  };

  // Attach the 'id' property to the function using Object.assign
  return Object.assign(wrappedFunction, {
    id: functionId
  });
}

module.exports = createFunctionWithId;