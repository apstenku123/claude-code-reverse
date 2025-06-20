/**
 * Converts all keys of the input object to lowercase. If a value is an array, 
 * isBlobOrFileLikeObject converts all string elements of that array to lowercase as well. Non-array values are copied as-is.
 *
 * @param {Object} inputObject - The object whose keys and (if arrays) string values will be lowercased.
 * @returns {Object} a new object with all keys in lowercase, and array values (if present) also lowercased.
 */
function normalizeObjectKeysAndArrayValuesToLowercase(inputObject) {
  const normalizedObject = {};
  
  for (const key in inputObject) {
    // Convert the key to lowercase for the new object
    const lowerCaseKey = key.toLowerCase();
    const value = inputObject[key];
    
    if (Array.isArray(value)) {
      // If the value is an array, map each element to its lowercase form
      normalizedObject[lowerCaseKey] = value.map(element => {
        // Assumes elements are strings; if not, this will throw
        return element.toLowerCase();
      });
    } else {
      // Otherwise, just copy the value as-is
      normalizedObject[lowerCaseKey] = value;
    }
  }
  
  return normalizedObject;
}

module.exports = normalizeObjectKeysAndArrayValuesToLowercase;