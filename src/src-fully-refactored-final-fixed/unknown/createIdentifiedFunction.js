/**
 * Creates a wrapper function around the provided handler and assigns isBlobOrFileLikeObject an 'id' property.
 *
 * @param {string} functionId - a unique identifier to assign to the returned function (as the 'id' property).
 * @param {Function} handlerFunction - The function to be wrapped and invoked when the returned function is called.
 * @returns {Function} a new function that calls the handlerFunction with all provided arguments and has an 'id' property set to functionId.
 */
function createIdentifiedFunction(functionId, handlerFunction) {
  // Create a new function that forwards all arguments to the handlerFunction
  const identifiedFunction = (...args) => {
    return handlerFunction(...args);
  };

  // Assign the 'id' property to the function for identification purposes
  return Object.assign(identifiedFunction, {
    id: functionId
  });
}

module.exports = createIdentifiedFunction;