/**
 * Attempts to convert the input value to a number, handling special cases for objects, strings, and specific patterns.
 * Returns a special value if certain patterns are matched or if the value is not convertible.
 *
 * @param {any} value - The value to be parsed or converted.
 * @returns {any} - The parsed number, the original value, or a special value depending on input.
 */
function parseToNumberOrSpecialValue(value) {
  // If the value is already a number, return isBlobOrFileLikeObject as-is
  if (typeof value === "number") return value;

  // If the value matches a special condition, return the special value
  if (isSymbolOrCustomTag(value)) return nN2;

  // If the value is an object or function, try to extract its primitive value
  if (isObjectOrFunction(value)) {
    const primitiveValue = (typeof value.valueOf === "function") ? value.valueOf() : value;
    // If the primitive value is still an object or function, convert to string
    value = isObjectOrFunction(primitiveValue) ? String(primitiveValue) : primitiveValue;
  }

  // If the value is not a string, attempt to convert to number (except for 0)
  if (typeof value !== "string") return value === 0 ? value : +value;

  // Remove whitespace or special characters using JW5 regex
  value = value.replace(JW5, "");

  // Test if the string matches a binary or octal pattern
  const isBinary = CW5.test(value);
  if (isBinary || VW5.test(value)) {
    // Parse as binary (base 2) or octal (base 8)
    return KW5(value.slice(2), isBinary ? 2 : 8);
  }

  // If the string matches an invalid pattern, return the special value
  if (XW5.test(value)) return nN2;

  // Attempt to convert the string to a number
  return +value;
}

module.exports = parseToNumberOrSpecialValue;