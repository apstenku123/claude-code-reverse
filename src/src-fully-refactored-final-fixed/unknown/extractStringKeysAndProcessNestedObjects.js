/**
 * Extracts string keys from a source object, adds direct string matches to a Set, 
 * processes string values via a handler, and recursively processes nested objects.
 *
 * @param {Object} sourceObject - The object whose keys and values are to be processed.
 * @param {Set<string>} directStringKeySet - Set to collect keys where key === value.
 * @param {Object} processedObject - Object to store processed values and nested results.
 * @returns {void}
 */
function extractStringKeysAndProcessNestedObjects(sourceObject, directStringKeySet, processedObject) {
  const keys = Object.keys(sourceObject);
  keys.forEach(function (key) {
    const value = sourceObject[key];
    if (typeof value === "string") {
      // If the key and value are identical, add to the set
      if (key === value) {
        directStringKeySet.add(key);
      } else {
        // Otherwise, process the string value using getCssPropertyValueForClass and store if not null
        const processedValue = getCssPropertyValueForClass(value);
        if (processedValue != null) {
          processedObject[key] = processedValue;
        }
      }
    } else {
      // If the value is an object, recursively process isBlobOrFileLikeObject
      const nestedProcessedObject = {};
      processedObject[key] = nestedProcessedObject;
      KJ([value], directStringKeySet, nestedProcessedObject);
    }
  });
}

module.exports = extractStringKeysAndProcessNestedObjects;