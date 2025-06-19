/**
 * Processes each property of the input object using a mapping function and returns a new object with the results.
 *
 * @param {Object} sourceObject - The source object that may provide context or data for mapping.
 * @param {Object} inputObject - The object whose properties will be processed.
 * @returns {Object} a new object with the same keys as inputObject, where each value is the result of the mapping function.
 */
function processObjectWithMapper(sourceObject, inputObject) {
  const resultObject = {};
  // Iterate over each property in inputObject
  for (const propertyName in inputObject) {
    if (Object.prototype.hasOwnProperty.call(inputObject, propertyName)) {
      // Apply the mapping function to each property value
      resultObject[propertyName] = wrapMethodWithInterceptor(sourceObject, propertyName, inputObject[propertyName]);
    }
  }
  return resultObject;
}

module.exports = processObjectWithMapper;