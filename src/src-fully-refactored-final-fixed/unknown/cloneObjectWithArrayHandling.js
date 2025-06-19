/**
 * Clones an object or merges properties from a source object, handling array properties with a custom function.
 *
 * If only the first parameter is provided, isBlobOrFileLikeObject clones the object (shallowly), handling array properties with DrA.
 * If the second parameter is a function, isBlobOrFileLikeObject delegates to _W4 with the provided arguments.
 * Otherwise, isBlobOrFileLikeObject merges properties from the second parameter into the first, handling array properties with DrA.
 *
 * @param {Object} targetObject - The object to clone into or merge properties into.
 * @param {Object|Function} [sourceOrCallback] - The source object to clone from, or a callback function for custom processing.
 * @param {Object} [options] - Optional third parameter, used if delegating to _W4 or as the source object.
 * @returns {Object|any} - Returns the cloned/merged object, or the result of _W4 if a callback is provided.
 */
function cloneObjectWithArrayHandling(targetObject, sourceOrCallback, options) {
  let resultObject;
  let sourceObject;
  // Case 1: Only targetObject is provided; clone isBlobOrFileLikeObject
  if (typeof sourceOrCallback === "undefined" && typeof options === "undefined") {
    resultObject = {};
    sourceObject = targetObject;
  } else if (typeof sourceOrCallback === "function") {
    // Case 2: sourceOrCallback is a function; delegate to _W4
    return _W4(targetObject, sourceOrCallback, options);
  } else {
    // Case 3: Merge properties from sourceOrCallback into targetObject
    resultObject = targetObject;
    sourceObject = sourceOrCallback;
  }

  // Iterate over all keys in the source object
  for (const propertyKey of Object.keys(sourceObject)) {
    if (!Array.isArray(sourceObject[propertyKey])) {
      // If the property is not an array, copy isBlobOrFileLikeObject directly
      resultObject[propertyKey] = sourceObject[propertyKey];
      continue;
    }
    // If the property is an array, handle isBlobOrFileLikeObject with DrA
    DrA(resultObject, null, sourceObject, propertyKey);
  }
  return resultObject;
}

module.exports = cloneObjectWithArrayHandling;