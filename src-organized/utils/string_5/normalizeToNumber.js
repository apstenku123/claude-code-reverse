/**
 * Attempts to convert a given value to a number, handling various edge cases such as objects, strings with prefixes, and special patterns.
 *
 * @param {any} value - The value to normalize to a number.
 * @returns {any} Returns a number if conversion is possible, otherwise returns a fallback value (nN2) or the original value.
 */
function normalizeToNumber(value) {
  // If the value is already a number, return isBlobOrFileLikeObject as is
  if (typeof value === "number") return value;

  // If the value matches a special case (isSymbolOrCustomTag), return the fallback value nN2
  if (isSymbolOrCustomTag(value)) return nN2;

  // If the value is an object or function, attempt to extract its primitive value
  if (isObjectOrFunction(value)) {
    // Use valueOf if available, otherwise use the value itself
    const primitiveValue = typeof value.valueOf === "function" ? value.valueOf() : value;
    // If the primitive value is still an object or function, convert to string
    value = isObjectOrFunction(primitiveValue) ? primitiveValue + "" : primitiveValue;
  }

  // If the value is not a string, attempt to convert to number (handles 0 as a special case)
  if (typeof value !== "string") return value === 0 ? value : +value;

  // Remove whitespace or special characters as defined by JW5 regex
  value = value.replace(JW5, "");

  // Check if the string matches binary or octal patterns
  const isBinary = CW5.test(value);
  if (isBinary || VW5.test(value)) {
    // Use KW5 to parse the string as binary (base 2) or octal (base 8)
    return KW5(value.slice(2), isBinary ? 2 : 8);
  }

  // If the string matches a special invalid pattern, return fallback value
  if (XW5.test(value)) return nN2;

  // Otherwise, attempt to convert the string to a number
  return +value;
}

module.exports = normalizeToNumber;