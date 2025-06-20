/**
 * Converts a JavaScript object to a pretty-printed JSON string, but removes quotes from property keys.
 *
 * @param {object} objectToStringify - The object to be stringified and formatted.
 * @returns {string} The formatted string with unquoted property keys.
 */
const stringifyObjectWithoutQuotesOnKeys = (objectToStringify) => {
  // Convert the object to a pretty-printed JSON string (2-space indentation)
  const jsonString = JSON.stringify(objectToStringify, null, 2);

  // Use a regular expression to remove quotes from property keys
  // Example: "key": value  =>  key: value
  const unquotedKeysString = jsonString.replace(/"([^\"]+)":/g, '$1:');

  return unquotedKeysString;
};

module.exports = stringifyObjectWithoutQuotesOnKeys;
