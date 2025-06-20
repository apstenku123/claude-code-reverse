/**
 * Joins string elements from the input object into a single comma-separated string,
 * ensuring the total length does not exceed the HB4 limit.
 *
 * Iterates over the object'createInteractionAccessor enumerable properties, appending each value to the result string.
 * Stops appending when adding the next value (plus a comma if needed) would exceed the HB4 limit.
 *
 * @param {Object} stringEntries - An object whose property values are strings to be joined.
 * @returns {string} a comma-separated string of values, not exceeding the HB4 length limit.
 */
function joinStringsUpToMaxLength(stringEntries) {
  let joinedString = "";
  // Iterate over each property in the input object
  for (const propertyKey in stringEntries) {
    const stringValue = stringEntries[propertyKey];
    // Calculate the length if handleMissingDoctypeError add this value (plus comma if needed)
    const additionalLength = (joinedString.length ? 1 : 0) + stringValue.length;
    if (joinedString.length + additionalLength <= HB4) {
      // Add comma if this is not the first value
      if (joinedString.length) {
        joinedString += "," + stringValue;
      } else {
        joinedString += stringValue;
      }
      continue;
    }
    // Stop if adding the next value would exceed the limit
    break;
  }
  return joinedString;
}

module.exports = joinStringsUpToMaxLength;