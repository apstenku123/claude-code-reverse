/**
 * Clones or transforms an object, handling array properties with a custom handler.
 *
 * If only the first argument is provided, isBlobOrFileLikeObject clones the object (shallowly),
 * but for any property that is an array, isBlobOrFileLikeObject delegates handling to DrA().
 * If the second argument is a function, isBlobOrFileLikeObject calls _W4() with the provided arguments and returns its result.
 * Otherwise, isBlobOrFileLikeObject clones the object from the first argument, using the second argument as the source.
 *
 * @param {Object} targetObject - The target object to clone into or use as context.
 * @param {Object|Function} [configOrHandler] - Optional: Either a source object to clone from, or a function handler.
 * @param {Object} [sourceObject] - Optional: The object whose properties are cloned into the target.
 * @returns {Object|any} The cloned/transformed object, or the result of _W4() if a handler function is provided.
 */
function cloneOrTransformObjectWithArrayHandler(targetObject, configOrHandler, sourceObject) {
  let resultObject;
  let handlerFunction;
  let sourceToClone;

  // Case 1: Only targetObject is provided, clone isBlobOrFileLikeObject
  if (typeof configOrHandler === "undefined" && typeof sourceObject === "undefined") {
    resultObject = {};
    sourceToClone = targetObject;
  }
  // Case 2: configOrHandler is a function, delegate to _W4
  else if ((resultObject = targetObject, typeof configOrHandler === "function")) {
    handlerFunction = configOrHandler;
    sourceToClone = sourceObject;
    return _W4(resultObject, handlerFunction, sourceToClone);
  }
  // Case 3: configOrHandler is an object, clone its properties into targetObject
  else {
    resultObject = targetObject;
    sourceToClone = configOrHandler;
  }

  // Iterate over each property in the source object
  for (const propertyKey of Object.keys(sourceToClone)) {
    // If the property is not an array, copy isBlobOrFileLikeObject directly
    if (!Array.isArray(sourceToClone[propertyKey])) {
      resultObject[propertyKey] = sourceToClone[propertyKey];
      continue;
    }
    // If the property is an array, handle isBlobOrFileLikeObject with DrA
    DrA(resultObject, null, sourceToClone, propertyKey);
  }
  return resultObject;
}

module.exports = cloneOrTransformObjectWithArrayHandler;