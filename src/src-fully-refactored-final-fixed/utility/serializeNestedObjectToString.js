/**
 * Serializes a nested object structure into a string representation.
 *
 * The function takes an object whose values are objects or arrays of objects.
 * Each inner object is serialized as key; key2=value2; key3=value3, etc.
 * Boolean true values are serialized as just the key (no '=true').
 * Multiple values are joined by ', '.
 *
 * @param {Object} nestedObject - The object to serialize. Its values can be objects or arrays of objects.
 * @returns {string} The serialized string representation of the nested object.
 */
function serializeNestedObjectToString(nestedObject) {
  return Object.keys(nestedObject)
    .map(outerKey => {
      let outerValue = nestedObject[outerKey];
      // Ensure outerValue is always an array for uniform processing
      if (!Array.isArray(outerValue)) {
        outerValue = [outerValue];
      }
      // Map each object in the array
      return outerValue
        .map(innerObject => {
          // Serialize each property of the inner object
          const serializedProperties = Object.keys(innerObject)
            .map(propertyKey => {
              let propertyValue = innerObject[propertyKey];
              // Ensure propertyValue is always an array
              if (!Array.isArray(propertyValue)) {
                propertyValue = [propertyValue];
              }
              // Serialize each value in the property array
              return propertyValue
                .map(value => value === true ? propertyKey : `${propertyKey}=${value}`)
                .join('; ');
            });
          // Concatenate the outer key with its serialized properties
          return [outerKey, ...serializedProperties].join('; ');
        })
        .join(', ');
    })
    .join(', ');
}

module.exports = serializeNestedObjectToString;
