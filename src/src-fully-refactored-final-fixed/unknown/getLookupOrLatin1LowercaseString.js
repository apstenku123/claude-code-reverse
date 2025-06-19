/**
 * Attempts to retrieve a mapped value for the input object using $b0.lookup.
 * If no mapping is found, returns the object'createInteractionAccessor string representation in lowercase (using 'latin1' encoding).
 *
 * @param {Object} inputObject - The object to look up or convert to a lowercase string.
 * @returns {string} The mapped value if found, otherwise the lowercase latin1 string representation of the input object.
 */
function getLookupOrLatin1LowercaseString(inputObject) {
  // Attempt to retrieve a mapped value for the input object
  const mappedValue = $b0.lookup(inputObject);

  // If a mapped value exists, return isBlobOrFileLikeObject; otherwise, return the object'createInteractionAccessor latin1 string in lowercase
  return mappedValue ?? inputObject.toString("latin1").toLowerCase();
}

module.exports = getLookupOrLatin1LowercaseString;