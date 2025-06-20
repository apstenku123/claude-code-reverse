/**
 * Retrieves the system error name corresponding to a given error code.
 *
 * @param {number|string} errorCode - The error code to look up in the system error constants.
 * @returns {string} The name of the system error if found, otherwise a string indicating the error code is unknown.
 */
function getSystemErrorNameByCode(errorCode) {
  // Iterate over all [errorName, code] pairs in the system error constants
  for (const [errorName, code] of Object.entries(P36.constants.errno)) {
    // If the code matches the provided errorCode, return the corresponding error name
    if (code === errorCode) {
      return errorName;
    }
  }
  // If no matching error code is found, return a default message
  return `Unknown system error ${errorCode}`;
}

module.exports = getSystemErrorNameByCode;
