/**
 * Filters an input object, retaining only valid attribute key-value pairs.
 *
 * For each property in the input object, the key is validated using isNonEmptyString and the value is validated using processInputOrEntries.
 * If the value is an array, a shallow copy is made; otherwise, the value is assigned directly.
 * Invalid keys or values trigger a warning via bF0.diag.warn and are skipped.
 *
 * @param {Object} attributes - The object containing attribute key-value pairs to validate and clone.
 * @returns {Object} a new object containing only valid attribute key-value pairs (arrays are shallow-copied).
 */
function filterAndCloneValidAttributes(attributes) {
  const validAttributes = {};

  // Ensure the input is a non-null object
  if (typeof attributes !== "object" || attributes == null) {
    return validAttributes;
  }

  // Iterate over each [key, value] pair in the input object
  for (const [attributeKey, attributeValue] of Object.entries(attributes)) {
    // Validate the attribute key
    if (!isNonEmptyString(attributeKey)) {
      bF0.diag.warn(`Invalid attribute key: ${attributeKey}`);
      continue;
    }
    // Validate the attribute value
    if (!processInputOrEntries(attributeValue)) {
      bF0.diag.warn(`Invalid attribute value set for key: ${attributeKey}`);
      continue;
    }
    // If the value is an array, make a shallow copy; otherwise, assign directly
    if (Array.isArray(attributeValue)) {
      validAttributes[attributeKey] = attributeValue.slice();
    } else {
      validAttributes[attributeKey] = attributeValue;
    }
  }

  return validAttributes;
}

module.exports = filterAndCloneValidAttributes;