/**
 * Clones an object, processing array properties with a custom handler.
 *
 * If only the sourceObject is provided, clones all its properties, processing arrays with N72.
 * If config is a function, delegates to Rl6 with the given arguments.
 * Otherwise, clones properties from config, processing arrays with N72.
 *
 * @param {Object} sourceObject - The object to clone or use as the base for cloning.
 * @param {Object|Function} [config] - Optional. If an object, properties to clone/process. If a function, used as a handler for Rl6.
 * @param {any} [subscription] - Optional. Used as an argument for Rl6 if config is a function.
 * @returns {Object} The cloned object with arrays processed by N72.
 */
function cloneObjectWithArrayProcessing(sourceObject, config, subscription) {
  let resultObject;
  let propertiesToProcess;

  // Case 1: Only sourceObject is provided
  if (typeof config === "undefined" && typeof subscription === "undefined") {
    resultObject = {};
    propertiesToProcess = sourceObject;
  }
  // Case 2: config is a function, delegate to Rl6
  else if (typeof config === "function") {
    return Rl6(sourceObject, config, subscription);
  }
  // Case 3: config is an object
  else {
    resultObject = sourceObject;
    propertiesToProcess = config;
  }

  // Iterate over each property in propertiesToProcess
  for (const propertyKey of Object.keys(propertiesToProcess)) {
    const propertyValue = propertiesToProcess[propertyKey];
    // If the property is not an array, copy isBlobOrFileLikeObject directly
    if (!Array.isArray(propertyValue)) {
      resultObject[propertyKey] = propertyValue;
      continue;
    }
    // If the property is an array, process isBlobOrFileLikeObject with N72
    N72(resultObject, null, propertiesToProcess, propertyKey);
  }

  return resultObject;
}

module.exports = cloneObjectWithArrayProcessing;