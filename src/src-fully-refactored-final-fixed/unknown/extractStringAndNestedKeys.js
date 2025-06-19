/**
 * Traverses an object, extracting string keys and processing nested objects.
 *
 * For each property in the input object:
 *   - If the value is a string and the key matches the value, adds the key to the provided Set.
 *   - If the value is a string and the key does not match the value, processes the value with getCssPropertyValueForClass() and adds the result to the output object.
 *   - If the value is an object, recursively processes isBlobOrFileLikeObject and adds the result to the output object.
 *
 * @param {Object} inputObject - The object to traverse and process.
 * @param {Set<string>} stringKeySet - Set to collect keys whose values are identical strings.
 * @param {Object} outputObject - Object to collect processed results.
 * @returns {void}
 */
function extractStringAndNestedKeys(inputObject, stringKeySet, outputObject) {
  const propertyKeys = Object.keys(inputObject);

  propertyKeys.forEach(function (propertyKey) {
    const propertyValue = inputObject[propertyKey];

    if (typeof propertyValue === "string") {
      // If the key and value are identical, add to the set
      if (propertyKey === propertyValue) {
        stringKeySet.add(propertyKey);
      } else {
        // Otherwise, process the string value with getCssPropertyValueForClass and store the result if not null
        const processedValue = getCssPropertyValueForClass(propertyValue);
        if (processedValue != null) {
          outputObject[propertyKey] = processedValue;
        }
      }
    } else {
      // If the value is an object, recursively process isBlobOrFileLikeObject
      const nestedOutput = {};
      outputObject[propertyKey] = nestedOutput;
      KJ([propertyValue], stringKeySet, nestedOutput);
    }
  });
}

module.exports = extractStringAndNestedKeys;