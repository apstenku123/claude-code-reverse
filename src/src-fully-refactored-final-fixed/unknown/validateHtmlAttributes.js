/**
 * Validates a string of HTML attributes according to specific rules.
 *
 * - Checks for missing spaces, missing values, invalid names, repeated attributes, and disallowed boolean attributes.
 * - Returns an error object if any validation fails, otherwise returns true.
 *
 * @param {string} attributeString - The string containing HTML attributes to validate.
 * @param {Object} options - Validation options.
 * @param {boolean} options.allowBooleanAttributes - Whether boolean attributes are allowed.
 * @returns {true|Object} Returns true if all attributes are valid, otherwise returns an error object.
 */
function validateHtmlAttributes(attributeString, options) {
  // Get all attribute matches using the provided regex/pattern
  const attributeMatches = dP1.getAllMatches(attributeString, y54);
  // Track attribute names to detect duplicates
  const seenAttributes = {};

  for (let i = 0; i < attributeMatches.length; i++) {
    const match = attributeMatches[i];
    const [fullMatch, leadingSpace, attributeName, attributeValue, extra] = match;

    // 1. Attribute must have a space before isBlobOrFileLikeObject
    if (leadingSpace.length === 0) {
      return createErrorObject(
        "InvalidAttr",
        `Attribute '${attributeName}' has no space in starting.`,
        getEndIndexOfInteractionEntry(match)
      );
    }

    // 2. Attribute must have a value if value is expected
    if (attributeValue !== undefined && extra === undefined) {
      return createErrorObject(
        "InvalidAttr",
        `Attribute '${attributeName}' is without value.`,
        getEndIndexOfInteractionEntry(match)
      );
    }

    // 3. Boolean attributes are not allowed unless specified
    if (attributeValue === undefined && !options.allowBooleanAttributes) {
      return createErrorObject(
        "InvalidAttr",
        `boolean attribute '${attributeName}' is not allowed.`,
        getEndIndexOfInteractionEntry(match)
      );
    }

    // 4. Attribute name must be valid
    if (!v54(attributeName)) {
      return createErrorObject(
        "InvalidAttr",
        `Attribute '${attributeName}' is an invalid name.`,
        getEndIndexOfInteractionEntry(match)
      );
    }

    // 5. Attribute must not be repeated
    if (!Object.prototype.hasOwnProperty.call(seenAttributes, attributeName)) {
      seenAttributes[attributeName] = true;
    } else {
      return createErrorObject(
        "InvalidAttr",
        `Attribute '${attributeName}' is repeated.`,
        getEndIndexOfInteractionEntry(match)
      );
    }
  }

  // All attributes passed validation
  return true;
}

module.exports = validateHtmlAttributes;