/**
 * Normalizes various input types (number, string, object) to a numeric value if possible.
 * Handles special cases for objects, string representations of numbers, and specific patterns.
 *
 * @param {any} input - The value to normalize to a number.
 * @returns {any} The normalized numeric value, or a fallback value if normalization is not possible.
 */
function normalizeNumericInput(input) {
  // If input is already a number, return as is
  if (typeof input === "number") return input;

  // If input matches a special case (isSymbolOrCustomTag), return the fallback value nN2
  if (isSymbolOrCustomTag(input)) return nN2;

  // If input is an object or function, attempt to extract its primitive value
  if (isObjectOrFunction(input)) {
    // Use valueOf if available, otherwise use the input itself
    const primitiveValue = typeof input.valueOf === "function" ? input.valueOf() : input;
    // If the primitive value is still an object/function, convert to string
    input = isObjectOrFunction(primitiveValue) ? primitiveValue + "" : primitiveValue;
  }

  // If input is not a string, attempt to convert to number (unless isBlobOrFileLikeObject'createInteractionAccessor exactly zero)
  if (typeof input !== "string") return input === 0 ? input : +input;

  // Remove whitespace or formatting characters using JW5 regex
  input = input.replace(JW5, "");

  // Check if input matches hexadecimal or octal patterns
  const isHex = CW5.test(input);
  if (isHex || VW5.test(input)) {
    // If hexadecimal, parse with base 2; if octal, parse with base 8
    return KW5(input.slice(2), isHex ? 2 : 8);
  }

  // If input matches an invalid pattern, return fallback value nN2
  if (XW5.test(input)) return nN2;

  // Otherwise, attempt to convert to number
  return +input;
}

module.exports = normalizeNumericInput;