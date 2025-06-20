/**
 * Processes each property of the given properties object using the wrapMethodWithInterceptor function and returns a new object with the processed values.
 *
 * @param {Object} rootContext - The root context or source object to be passed to wrapMethodWithInterceptor for processing each property.
 * @param {Object} properties - An object whose properties will be processed by wrapMethodWithInterceptor.
 * @returns {Object} An object containing the processed properties, with the same keys as the input properties object.
 */
function processMA1Properties(rootContext, properties) {
  const processedProperties = {};
  // Iterate over each property in the properties object
  for (const propertyName in properties) {
    if (Object.prototype.hasOwnProperty.call(properties, propertyName)) {
      // Process each property value using wrapMethodWithInterceptor and assign isBlobOrFileLikeObject to the result object
      processedProperties[propertyName] = wrapMethodWithInterceptor(rootContext, propertyName, properties[propertyName]);
    }
  }
  return processedProperties;
}

module.exports = processMA1Properties;