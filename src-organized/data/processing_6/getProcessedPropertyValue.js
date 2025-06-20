/**
 * Retrieves a processed property value from a given object after applying key normalization and transformation functions.
 *
 * @param {Object} targetObject - The object from which to retrieve the property value.
 * @param {string} propertyKey - The key (possibly unnormalized) whose value is to be retrieved from the object.
 * @param {any} additionalArgument - An additional argument passed to the property value processor.
 * @returns {any} - Returns the processed property value if found, otherwise returns the default value from processInteractionEntries.
 */
function getProcessedPropertyValue(targetObject, propertyKey, additionalArgument) {
  // Normalize the property key using processPendingFiberNodes
  const normalizedKey = processPendingFiberNodes(propertyKey, targetObject);

  // Transform the target object using validateClassInstance and the normalized key
  const transformedObject = validateClassInstance(targetObject, normalizedKey);

  // If the transformed object is null or undefined, return the default value
  if (transformedObject == null) {
    return processInteractionEntries;
  }

  // Compute the final property name using FY and defineOrAssignProperty
  const finalPropertyName = defineOrAssignProperty(FY(normalizedKey));

  // Retrieve the property value from the transformed object
  const propertyValue = transformedObject[finalPropertyName];

  // If the property value is null or undefined, return the default value
  if (propertyValue == null) {
    return processInteractionEntries;
  }

  // Process the property value using handleReturnIfPresent and return the result
  return handleReturnIfPresent(propertyValue, transformedObject, additionalArgument);
}

module.exports = getProcessedPropertyValue;