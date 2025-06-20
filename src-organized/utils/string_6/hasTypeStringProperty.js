/**
 * Checks if the provided object has a '@type' property whose value is a string.
 *
 * @param {object} objectToCheck - The object to inspect for the '@type' property.
 * @returns {boolean} True if the object has a '@type' property and its value is a string, otherwise false.
 */
function hasTypeStringProperty(objectToCheck) {
  // Ensure '@type' exists as a property and its value is a string
  return "@type" in objectToCheck && typeof objectToCheck["@type"] === "string";
}

module.exports = hasTypeStringProperty;
