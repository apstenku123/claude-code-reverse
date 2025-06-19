/**
 * Creates a shallow copy of an object, omitting the specified properties.
 *
 * @param {Object} sourceObject - The object to copy properties from.
 * @param {...string} propertiesToOmit - The property names to exclude from the returned object.
 * @returns {Object} a new object containing all properties from sourceObject except those listed in propertiesToOmit.
 */
function omitProperties(sourceObject, ...propertiesToOmit) {
  const resultObject = {};
  // Iterate over all enumerable properties in the source object
  for (const propertyName in sourceObject) {
    // Only copy properties not listed in propertiesToOmit
    if (!propertiesToOmit.includes(propertyName)) {
      resultObject[propertyName] = sourceObject[propertyName];
    }
  }
  return resultObject;
}

module.exports = omitProperties;
