/**
 * Serializes an object whose values are objects or arrays of objects into a formatted string.
 * Each top-level key is processed, and its value(createInteractionAccessor) are serialized as key-value pairs.
 * Boolean true values are represented by the key name alone; other values are formatted as key=value.
 * Multiple values are separated by ", ", and multiple key-value pairs within an object are separated by "; ".
 *
 * @param {Object} objectWithArrayValues - The object to serialize. Each property value can be an object or an array of objects.
 * @returns {string} The serialized string representation of the object.
 */
function serializeObjectWithArrayValues(objectWithArrayValues) {
  return Object.keys(objectWithArrayValues)
    .map((topLevelKey) => {
      let valueOrArray = objectWithArrayValues[topLevelKey];
      // Ensure the value is always an array for uniform processing
      if (!Array.isArray(valueOrArray)) {
        valueOrArray = [valueOrArray];
      }
      // Map over each object in the array
      return valueOrArray
        .map((nestedObject) => {
          // For each nested object, serialize its keys and values
          const serializedPairs = Object.keys(nestedObject)
            .map((nestedKey) => {
              let nestedValueOrArray = nestedObject[nestedKey];
              // Ensure the nested value is always an array
              if (!Array.isArray(nestedValueOrArray)) {
                nestedValueOrArray = [nestedValueOrArray];
              }
              // Serialize each value: if true, just the key; else key=value
              return nestedValueOrArray
                .map((item) => (item === true ? nestedKey : `${nestedKey}=${item}`))
                .join('; ');
            })
            .join('; ');
          // Prepend the top-level key to the serialized pairs
          return [topLevelKey, serializedPairs].join('; ');
        })
        .join(', ');
    })
    .join(', ');
}

module.exports = serializeObjectWithArrayValues;
