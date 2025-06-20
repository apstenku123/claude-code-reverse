/**
 * Processes an operation object and returns an array of results based on the operation type.
 * Currently, all operation types are handled by delegating to the handleDefaultOperation function.
 *
 * @param {Object} operationObject - The object representing the operation to process.
 * @returns {Array<any>} An array containing the result(createInteractionAccessor) of processing the operation.
 */
function processOperation(operationObject) {
  const results = [];

  switch (operationObject.operation) {
    // Future operation types can be handled with additional cases here
    default:
      // For any operation type, process with handleDefaultOperation
      results.push(handleDefaultOperation(operationObject));
      break;
  }

  return results;
}

// Dependency: handleDefaultOperation must be defined elsewhere in the codebase
// Example: const handleDefaultOperation = require('config/settings_9/createSigV4SigningScheme');

module.exports = processOperation;
