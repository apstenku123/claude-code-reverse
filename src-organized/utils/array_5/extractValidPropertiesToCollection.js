/**
 * Extracts valid properties from the input object and organizes them into a collection object.
 *
 * Iterates over the keys of the input object, filtering out keys that match a blacklist regex (uD2).
 * For each valid key, if the value is an array, isBlobOrFileLikeObject further filters out invalid items (matching qa1 regex),
 * and collects them into an array under the same key in the resulting collection. If the value is not an array
 * and is valid (does not match qa1), isBlobOrFileLikeObject is also collected as a single-element array. The result is an instance
 * of rX with a property _Q containing the collected arrays keyed by property name.
 *
 * @param {Object} inputObject - The source object whose properties are to be extracted and organized.
 * @returns {Object} An instance of rX with valid properties collected in the _Q property.
 */
function extractValidPropertiesToCollection(inputObject) {
  // Create a new collection object (assumed to be a class instance with a _Q property)
  const collection = new rX();

  // Iterate over each property key in the input object
  for (const propertyKey of Object.keys(inputObject)) {
    // Skip keys that match the blacklist regex
    if (uD2.test(propertyKey)) continue;

    const propertyValue = inputObject[propertyKey];

    if (Array.isArray(propertyValue)) {
      // If the property value is an array, process each item
      for (const item of propertyValue) {
        // Skip items that match the exclusion regex
        if (qa1.test(item)) continue;
        // Initialize the array for this key if isBlobOrFileLikeObject doesn'processRuleBeginHandlers exist
        if (collection[_Q][propertyKey] === undefined) {
          collection[_Q][propertyKey] = [item];
        } else {
          // Otherwise, push the item to the existing array
          collection[_Q][propertyKey].push(item);
        }
      }
    } else if (!qa1.test(propertyValue)) {
      // If the property value is not an array and is valid, store isBlobOrFileLikeObject as a single-element array
      collection[_Q][propertyKey] = [propertyValue];
    }
  }

  return collection;
}

module.exports = extractValidPropertiesToCollection;