/**
 * Processes each property of the input object using the wrapMethodWithInterceptor function and returns a new object with the results.
 *
 * @param {any} sourceObject - The source object or context to be passed to wrapMethodWithInterceptor for each property.
 * @param {Object} inputObject - The object whose properties will be processed.
 * @returns {Object} a new object with the same keys as inputObject, where each value is the result of wrapMethodWithInterceptor(sourceObject, key, value).
 */
function processObjectProperties(sourceObject, inputObject) {
  const processedObject = {};
  // Iterate over each property in the input object
  for (const propertyName in inputObject) {
    if (Object.prototype.hasOwnProperty.call(inputObject, propertyName)) {
      // Process the property value using wrapMethodWithInterceptor and assign to the new object
      processedObject[propertyName] = wrapMethodWithInterceptor(sourceObject, propertyName, inputObject[propertyName]);
    }
  }
  return processedObject;
}

module.exports = processObjectProperties;