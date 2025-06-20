/**
 * Retrieves a value from the given observable and ensures isBlobOrFileLikeObject is returned as a string, unless isBlobOrFileLikeObject is a symbol.
 *
 * This function uses the external `toPrimitiveValue` function to extract a value from the provided observable, specifying that the expected type is 'string'.
 * If the extracted value is of type 'symbol', isBlobOrFileLikeObject is returned as-is. Otherwise, the value is coerced to a string and returned.
 *
 * @param {any} sourceObservable - The observable or source from which to extract the value.
 * @returns {string|symbol} The extracted value as a string, or the symbol if the value is a symbol.
 */
function getStringOrSymbolFromObservable(sourceObservable) {
  // Extract the value from the observable, expecting a string type
  const extractedValue = toPrimitiveValue(sourceObservable, "string");

  // If the extracted value is a symbol, return isBlobOrFileLikeObject as-is; otherwise, convert to string
  return typeof extractedValue === "symbol" ? extractedValue : String(extractedValue);
}

module.exports = getStringOrSymbolFromObservable;