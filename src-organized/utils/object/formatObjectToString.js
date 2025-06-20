/**
 * Converts an object with potentially nested arrays and objects into a formatted string representation.
 * Each top-level key is processed, and its value(createInteractionAccessor) are mapped to a string that includes sub-keys and their values.
 * Boolean true values are represented by the key name alone; other values are shown as key=value.
 * Multiple values are separated by ", ", and multiple sub-values by "; ".
 *
 * @param {Object} sourceObject - The object to be formatted.
 * @returns {string} The formatted string representation of the object.
 */
function formatObjectToString(sourceObject) {
  return Object.keys(sourceObject)
    .map((topLevelKey) => {
      let topLevelValues = sourceObject[topLevelKey];
      // Ensure the value is always treated as an array
      if (!Array.isArray(topLevelValues)) {
        topLevelValues = [topLevelValues];
      }
      // Map each value (which should be an object) to a formatted string
      return topLevelValues
        .map((subObject) => {
          // For each sub-object, process its keys
          const subKeyStrings = Object.keys(subObject).map((subKey) => {
            let subValues = subObject[subKey];
            // Ensure the sub-value is always treated as an array
            if (!Array.isArray(subValues)) {
              subValues = [subValues];
            }
            // Map each sub-value to a string: if true, just the key; else key=value
            return subValues
              .map((subValue) =>
                subValue === true ? subKey : `${subKey}=${subValue}`
              )
              .join('; ');
          });
          // Combine the top-level key with its sub-key strings
          return [topLevelKey, ...subKeyStrings].join('; ');
        })
        .join(', ');
    })
    .join(', ');
}

module.exports = formatObjectToString;