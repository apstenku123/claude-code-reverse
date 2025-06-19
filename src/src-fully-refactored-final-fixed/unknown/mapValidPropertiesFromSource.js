/**
 * Iterates over a list of property keys, retrieves their values from a source object,
 * validates each value using isValidAndCheck, and constructs a new object containing
 * only the valid key-value pairs.
 *
 * @param {Object} sourceObject - The object from which to extract property values.
 * @param {Array<string>} propertyKeys - The list of property keys to process.
 * @returns {Object} An object containing only the valid key-value pairs from the source object.
 */
function mapValidPropertiesFromSource(sourceObject, propertyKeys) {
  return processAndMapProperties(
    sourceObject,
    propertyKeys,
    /**
     * Predicate function to validate each property value.
     * @param {string} propertyKey - The current property key being processed.
     * @param {*} propertyValue - The value of the current property.
     * @returns {boolean} True if the property value is valid, false otherwise.
     */
    function validateProperty(sourceObject, propertyValue) {
      // Use isValidAndCheck to determine if the property value is valid
      return isValidAndCheck(sourceObject, propertyValue);
    }
  );
}

module.exports = mapValidPropertiesFromSource;