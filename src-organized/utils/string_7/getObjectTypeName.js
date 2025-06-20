/**
 * Returns the internal [[Class]] type name of a given value (e.g., 'Array', 'Object', 'Number').
 *
 * @param {any} value - The value whose internal type name is to be determined.
 * @returns {string|null} The type name if matched (e.g., 'Array'), otherwise null.
 */
function getObjectTypeName(value) {
  // Call eY5 (likely Object.prototype.toString) with the value as context
  // This returns a string like '[object Array]' or '[object Object]'
  const typeString = eY5.call(value);

  // Use regex to extract the type name from the string
  const match = typeString.match(/\[object (.*)\]/);

  // If a match is found, return the captured type name; otherwise, return null
  return match ? match[1] : match;
}

module.exports = getObjectTypeName;