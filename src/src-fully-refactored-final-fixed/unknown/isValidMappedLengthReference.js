/**
 * Checks if the provided object is valid according to three criteria:
 * 1. The object passes the cacheElementDataIfApplicable validation (e.g., is of a certain type or structure).
 * 2. The object has a valid 'length' property (checked by cleanupFiberNodes).
 * 3. The handleAccessorInput map contains a truthy value for the key produced by getProcessedValue(object).
 *
 * @param {any} candidateObject - The object to validate.
 * @returns {boolean} True if all validation checks pass, otherwise false.
 */
function isValidMappedLengthReference(candidateObject) {
  // Check if the object passes the cacheElementDataIfApplicable validation
  const isValidObject = cacheElementDataIfApplicable(candidateObject);

  // Check if the object has a valid length property
  const hasValidLength = cleanupFiberNodes(candidateObject.length);

  // Get the mapped key for the object
  const mappedKey = getProcessedValue(candidateObject);

  // Check if handleAccessorInput has a truthy value for the mapped key
  const hasMappedReference = !!handleAccessorInput[mappedKey];

  // Return true only if all checks pass
  return isValidObject && hasValidLength && hasMappedReference;
}

module.exports = isValidMappedLengthReference;