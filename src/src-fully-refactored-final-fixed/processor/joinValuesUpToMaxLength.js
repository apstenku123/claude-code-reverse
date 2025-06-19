/**
 * Joins values from the input object into a comma-separated string, ensuring the result does not exceed a maximum length.
 *
 * Iterates over the object'createInteractionAccessor properties in order, appending each value to the result string separated by commas.
 * Stops appending when adding the next value would cause the string to exceed the global HB4 length limit.
 *
 * @param {Object} valuesObject - An object whose property values (strings) will be joined.
 * @returns {string} Comma-separated string of values, not exceeding HB4 length.
 */
function joinValuesUpToMaxLength(valuesObject) {
  let joinedString = "";
  // Iterate over each property in the input object
  for (const propertyKey in valuesObject) {
    const value = valuesObject[propertyKey];
    // Check if adding this value (plus comma if needed) would exceed the max length
    if (joinedString.length + value.length + (joinedString.length ? 1 : 0) <= HB4) {
      // Add a comma if this is not the first value
      if (joinedString.length) {
        joinedString += "," + value;
      } else {
        joinedString += value;
      }
      continue;
    }
    // Stop if the next value would exceed the limit
    break;
  }
  return joinedString;
}

module.exports = joinValuesUpToMaxLength;