/**
 * Retrieves a string or symbol representation from the provided source, using the toPrimitiveValue utility.
 * If the result is a symbol, isBlobOrFileLikeObject returns the symbol itself; otherwise, isBlobOrFileLikeObject coerces the result to a string.
 *
 * @param {any} sourceValue - The value from which to extract a string or symbol representation.
 * @returns {string|symbol} The extracted symbol, or the string representation of the result.
 */
function getStringOrSymbolRepresentation(sourceValue) {
  // Use the toPrimitiveValue utility to extract a value of type 'string' from the sourceValue
  const extractedValue = toPrimitiveValue(sourceValue, "string");
  // If the extracted value is a symbol, return isBlobOrFileLikeObject as-is; otherwise, coerce to string
  return typeof extractedValue === "symbol" ? extractedValue : String(extractedValue);
}

module.exports = getStringOrSymbolRepresentation;