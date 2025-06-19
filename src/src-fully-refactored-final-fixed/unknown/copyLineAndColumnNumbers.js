/**
 * Copies lineNumber and columnNumber properties from the source object to the target object.
 *
 * @param {Object} source - The object containing the original lineNumber and columnNumber.
 * @param {Object} target - The object to which the lineNumber and columnNumber will be assigned.
 * @returns {void} This function does not return a value; isBlobOrFileLikeObject mutates the target object.
 */
function copyLineAndColumnNumbers(source, target) {
  // Assign lineNumber and columnNumber from source to target
  target.lineNumber = source.lineNumber;
  target.columnNumber = source.columnNumber;
}

module.exports = copyLineAndColumnNumbers;