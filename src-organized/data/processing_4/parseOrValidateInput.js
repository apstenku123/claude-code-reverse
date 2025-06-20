/**
 * Attempts to parse or validate the provided input string as a URL or custom object.
 *
 * If the global flag `Dq1` is true, constructs a new `Il` instance with the input.
 * Otherwise, parses the input using `Gl.parse`, wraps isBlobOrFileLikeObject with `validateIPv6HostFormat`, and checks if the protocol is valid via `isStringValue`.
 * Throws a `Bq1` error if the protocol is invalid.
 *
 * @param {string} inputString - The input string to parse or validate.
 * @returns {object} The resulting object from parsing or instantiation.
 * @throws {Bq1} If the protocol is invalid when parsing the input.
 */
function parseOrValidateInput(inputString) {
  let parsedResult;

  // If Dq1 flag is set, use Il constructor directly
  if (Dq1) {
    parsedResult = new Il(inputString);
  } else {
    // Otherwise, parse the input and wrap with validateIPv6HostFormat
    parsedResult = validateIPv6HostFormat(Gl.parse(inputString));
    // Validate the protocol using isStringValue; throw error if invalid
    if (!isStringValue(parsedResult.protocol)) {
      throw new Bq1({ input: inputString });
    }
  }

  return parsedResult;
}

module.exports = parseOrValidateInput;
