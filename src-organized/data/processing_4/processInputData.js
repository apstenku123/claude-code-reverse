/**
 * Processes the input data object and returns a specific property if isBlobOrFileLikeObject exists.
 *
 * @param {Object} inputData - The input object to process.
 * @returns {any} The value of the 'result' property if present, otherwise null.
 */
function processInputData(inputData) {
  // Check if inputData is an object and has the 'result' property
  if (inputData && typeof inputData === 'object' && 'result' in inputData) {
    return inputData.result;
  }
  // Return null if 'result' property does not exist
  return null;
}

module.exports = processInputData;