/**
 * Parses an identifier string from the provided source and processes isBlobOrFileLikeObject.
 *
 * @function parseIdentifierFromSource
 * @description
 * Calls the parseIdString function with the identifier string and context object.
 * This function acts as a wrapper to trigger parsing and validation of the identifier.
 *
 * @param {string} identifierString - The identifier string to be parsed (supports decimal, hexadecimal, octal, and special string cases).
 * @param {object} context - The context object used during parsing (may contain configuration or state).
 * @returns {any} The result of the parseIdString function, which is typically the parsed numeric value or throws an error for invalid input.
 */
function parseIdentifierFromSource(identifierString, context) {
  // Call parseIdString to parse and validate the identifier string
  return parseIdString(identifierString, context);
}

module.exports = parseIdentifierFromSource;