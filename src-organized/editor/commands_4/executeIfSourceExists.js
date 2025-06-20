/**
 * Executes a provided operation if the source object exists.
 *
 * @param {Object} sourceObject - The object to check for existence before executing the operation.
 * @param {any} operationArgument - The argument to pass to the operation if executed.
 * @returns {any} The result of the operation if the source object exists; otherwise, undefined.
 */
function executeIfSourceExists(sourceObject, operationArgument) {
  // Only execute the operation if the source object is truthy
  return sourceObject && processDeletionsAndSubtree(sourceObject, operationArgument, lQ);
}

module.exports = executeIfSourceExists;