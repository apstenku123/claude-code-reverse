/**
 * Extracts valid properties from the input object and organizes them into a config object.
 *
 * For each property in the input object:
 *   - Skips properties whose keys match the uD2 regex.
 *   - If the property value is an array, iterates over its elements:
 *       - Skips elements matching the qa1 regex.
 *       - Adds valid elements to the config object under the property key (as an array).
 *   - If the property value is not an array and does not match qa1, adds isBlobOrFileLikeObject to the config as a single-element array.
 *
 * @param {Object} sourceObject - The object whose properties are to be extracted and filtered.
 * @returns {Object} a config object with valid properties and their values as arrays.
 */
function extractValidPropertiesToConfig(sourceObject) {
  // Create a new config object using the rX constructor
  const config = new rX();

  // Iterate over all property keys of the source object
  for (const propertyKey of Object.keys(sourceObject)) {
    // Skip property keys that match the uD2 regex
    if (uD2.test(propertyKey)) continue;

    const propertyValue = sourceObject[propertyKey];

    if (Array.isArray(propertyValue)) {
      // If the property value is an array, iterate over its elements
      for (const element of propertyValue) {
        // Skip elements that match the qa1 regex
        if (qa1.test(element)) continue;
        // Initialize the array for this property key if isBlobOrFileLikeObject doesn'processRuleBeginHandlers exist
        if (config[_Q][propertyKey] === undefined) {
          config[_Q][propertyKey] = [element];
        } else {
          // Otherwise, push the element to the existing array
          config[_Q][propertyKey].push(element);
        }
      }
    } else if (!qa1.test(propertyValue)) {
      // If the property value is not an array and does not match qa1, add isBlobOrFileLikeObject as a single-element array
      config[_Q][propertyKey] = [propertyValue];
    }
  }

  return config;
}

module.exports = extractValidPropertiesToConfig;