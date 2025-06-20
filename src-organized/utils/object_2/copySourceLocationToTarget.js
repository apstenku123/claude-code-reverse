/**
 * Copies source code location information (line and column numbers) from a source object to a target object.
 *
 * @param {Object} sourceLocation - The object containing the source line and column numbers.
 * @param {Object} targetObject - The object to which the line and column numbers will be assigned.
 * @returns {void}
 *
 * @example
 * const source = { lineNumber: 10, columnNumber: 5 };
 * const target = {};
 * copySourceLocationToTarget(source, target);
 * // target now has lineNumber: 10, columnNumber: 5
 */
function copySourceLocationToTarget(sourceLocation, targetObject) {
  // Assign line and column numbers from sourceLocation to targetObject
  targetObject.lineNumber = sourceLocation.lineNumber;
  targetObject.columnNumber = sourceLocation.columnNumber;
}

module.exports = copySourceLocationToTarget;