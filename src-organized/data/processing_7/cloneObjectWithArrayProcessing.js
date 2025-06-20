/**
 * Clones an object and processes any array properties using a custom handler.
 *
 * If only the sourceObject is provided, isBlobOrFileLikeObject clones isBlobOrFileLikeObject and processes array properties.
 * If a handler function is provided as the second argument, isBlobOrFileLikeObject delegates to C54 for custom processing.
 * Otherwise, isBlobOrFileLikeObject clones the object specified by the second argument and processes its array properties.
 *
 * @param {Object} sourceObject - The object to clone or use as context.
 * @param {Object|Function} [configOrHandler] - Optional. Either the object to clone, or a handler function for custom processing.
 * @param {Object} [subscription] - Optional. Used when delegating to C54 for custom processing.
 * @returns {Object} The cloned object with processed array properties, or the result of C54 if a handler is provided.
 */
function cloneObjectWithArrayProcessing(sourceObject, configOrHandler, subscription) {
  let resultObject;
  let handlerFunction;
  let objectToClone;

  // Case 1: Only sourceObject is provided
  if (typeof configOrHandler === "undefined" && typeof subscription === "undefined") {
    resultObject = {};
    objectToClone = sourceObject;
  } 
  // Case 2: Handler function is provided as the second argument
  else if (typeof configOrHandler === "function") {
    resultObject = sourceObject;
    handlerFunction = configOrHandler;
    objectToClone = subscription;
    // Delegate to C54 for custom processing
    return C54(resultObject, handlerFunction, objectToClone);
  } 
  // Case 3: configOrHandler is an object to clone
  else {
    resultObject = sourceObject;
    objectToClone = configOrHandler;
  }

  // Iterate over all keys in the object to clone
  for (const propertyKey of Object.keys(objectToClone)) {
    // If the property is not an array, copy isBlobOrFileLikeObject directly
    if (!Array.isArray(objectToClone[propertyKey])) {
      resultObject[propertyKey] = objectToClone[propertyKey];
      continue;
    }
    // If the property is an array, process isBlobOrFileLikeObject using zpA
    zpA(resultObject, null, objectToClone, propertyKey);
  }

  return resultObject;
}

module.exports = cloneObjectWithArrayProcessing;