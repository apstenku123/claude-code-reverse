/**
 * Serializes an object'createInteractionAccessor properties into a formatted string.
 *
 * For each property in the input object, this function:
 *   - Ensures the property value is an array (wraps in array if not)
 *   - For each element (object) in that array:
 *       - Serializes its own properties, ensuring each value is an array (wraps if not)
 *       - For each value in those arrays:
 *           - If the value is exactly true, outputs just the property key
 *           - Otherwise, outputs 'key=value'
 *       - Joins multiple values with '; '
 *   - Joins multiple property serializations with '; '
 * - Joins all top-level property serializations with ', '
 *
 * @param {Object} objectToSerialize - The object whose properties will be serialized
 * @returns {string} The serialized string representation of the object
 */
function serializeObjectProperties(objectToSerialize) {
  return Object.keys(objectToSerialize).map(propertyKey => {
    let propertyValue = objectToSerialize[propertyKey];
    // Ensure propertyValue is always an array for uniform processing
    if (!Array.isArray(propertyValue)) {
      propertyValue = [propertyValue];
    }
    // Map over each item in the propertyValue array
    return propertyValue.map(propertyItem => {
      // For each propertyItem (expected to be an object), serialize its properties
      const serializedProperties = Object.keys(propertyItem).map(innerKey => {
        let innerValue = propertyItem[innerKey];
        // Ensure innerValue is always an array
        if (!Array.isArray(innerValue)) {
          innerValue = [innerValue];
        }
        // Serialize each value in the innerValue array
        return innerValue.map(value => {
          // If the value is exactly true, output just the key; otherwise, key=value
          return value === true ? innerKey : `${innerKey}=${value}`;
        }).join('; ');
      });
      // Combine the property key with its serialized properties
      return [propertyKey].concat(serializedProperties).join('; ');
    }).join(', ');
  }).join(', ');
}

module.exports = serializeObjectProperties;