/**
 * Processes the given source object if isBlobOrFileLikeObject is a constructed object and not excluded by the zy check.
 * If the source object'createInteractionAccessor constructor is a function and zy(sourceObject) returns false,
 * isBlobOrFileLikeObject applies Oy to the source object and then processes the result with o0A.
 * Otherwise, returns an empty object.
 *
 * @param {Object} sourceObject - The object to be processed.
 * @returns {Object} The processed object or an empty object if conditions are not met.
 */
function getProcessedObjectOrEmpty(sourceObject) {
  // Check if the sourceObject has a constructor function and is not excluded by zy
  const hasConstructorFunction = typeof sourceObject.constructor === "function";
  const isNotExcluded = !zy(sourceObject);

  if (hasConstructorFunction && isNotExcluded) {
    // Apply Oy to the sourceObject, then process the result with o0A
    const transformedObject = Oy(sourceObject);
    return o0A(transformedObject);
  }

  // Return an empty object if conditions are not met
  return {};
}

module.exports = getProcessedObjectOrEmpty;