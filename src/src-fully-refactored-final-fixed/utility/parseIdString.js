/**
 * Parses an identifier string and returns its numeric value based on its format.
 * Handles decimal, hexadecimal, octal, and special string cases.
 * Throws an error for invalid formats or negative values when not allowed.
 *
 * @param {string} idString - The identifier string to parse.
 * @param {boolean} allowNegative - Whether negative values are allowed.
 * @returns {number} The parsed numeric value of the identifier.
 * @throws {Error} If the idString is invalid or negative values are not allowed.
 */
function parseIdString(idString, allowNegative) {
  // Handle special cases for 'max' (case-insensitive)
  switch (idString) {
    case "max":
    case "MAX":
    case "Max":
      return 536870911;
    case "0":
      return 0;
  }

  // Throw error if negative values are not allowed and idString starts with '-'
  if (!allowNegative && idString.charAt(0) === "-") {
    throw formatIdError(idString, "id");
  }

  // Check for decimal format
  if (decimalIdPattern.test(idString)) {
    return parseInt(idString, 10);
  }

  // Check for hexadecimal format
  if (hexadecimalIdPattern.test(idString)) {
    return parseInt(idString, 16);
  }

  // Check for octal format
  if (octalIdPattern.test(idString)) {
    return parseInt(idString, 8);
  }

  // Throw error if idString does not match any valid format
  throw formatIdError(idString, "id");
}

module.exports = parseIdString;