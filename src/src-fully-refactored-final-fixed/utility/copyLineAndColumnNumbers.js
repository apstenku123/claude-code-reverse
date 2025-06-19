/**
 * Copies the lineNumber and columnNumber properties from the source object to the target object.
 *
 * @param {Object} source - The object containing the lineNumber and columnNumber properties to copy.
 * @param {Object} target - The object to which the properties will be copied.
 * @returns {Object} The updated target object with the copied properties.
 */
function copyLineAndColumnNumbers(source, target) {
  // Copy the lineNumber property from source to target
  target.lineNumber = source.lineNumber;
  // Copy the columnNumber property from source to target
  target.columnNumber = source.columnNumber;
  return target;
}

module.exports = copyLineAndColumnNumbers;