/**
 * Clones an object or processes isBlobOrFileLikeObject with a callback, handling array properties specially.
 *
 * If only the sourceObject is provided, returns a shallow clone of sourceObject,
 * with array properties processed via N72. If a callback is provided as the second argument,
 * delegates to Rl6 with the provided arguments. Otherwise, clones the configObject,
 * processing array properties via N72.
 *
 * @param {Object} sourceObject - The object to clone or process.
 * @param {Object|Function} [configOrCallback] - Optional config object to clone, or a callback function.
 * @param {Object} [subscription] - Optional subscription object, used if a callback is provided.
 * @returns {Object} The cloned or processed object.
 */
function cloneOrProcessObjectWithArrayHandling(sourceObject, configOrCallback, subscription) {
  let resultObject;
  let objectToProcess;

  // Case 1: Only sourceObject is provided
  if (typeof configOrCallback === "undefined" && typeof subscription === "undefined") {
    resultObject = {};
    objectToProcess = sourceObject;
  } else if (typeof configOrCallback === "function") {
    // Case 2: configOrCallback is a callback function, delegate to Rl6
    return Rl6(sourceObject, configOrCallback, subscription);
  } else {
    // Case 3: configOrCallback is an object to clone/process
    resultObject = sourceObject;
    objectToProcess = configOrCallback;
  }

  // Iterate over all properties in objectToProcess
  for (const propertyKey of Object.keys(objectToProcess)) {
    if (!Array.isArray(objectToProcess[propertyKey])) {
      // Directly copy non-array properties
      resultObject[propertyKey] = objectToProcess[propertyKey];
      continue;
    }
    // For array properties, use N72 to process them
    N72(resultObject, null, objectToProcess, propertyKey);
  }

  return resultObject;
}

module.exports = cloneOrProcessObjectWithArrayHandling;