/**
 * Invokes a format handler method based on the provided format identifier or object.
 *
 * @param {string|object} formatIdentifierOrObject - a string format identifier or an object with an 'id' property.
 * @param {any} handlerArgument - Argument to pass to the format handler method.
 * @returns {any} The result of the invoked format handler method.
 * @throws {Error} If the format identifier is invalid or not found in the format handler map.
 */
function invokeFormatHandlerById(formatIdentifierOrObject, handlerArgument) {
  // Determine the format key: if an object with a string 'id', use that; otherwise, use the string directly
  const formatKey = (x1.object(formatIdentifierOrObject) && x1.string(formatIdentifierOrObject.id)
    ? formatIdentifierOrObject.id
    : formatIdentifierOrObject
  ).toLowerCase();

  // Look up the handler method name in the format handler map (yH2)
  const handlerMethodName = yH2.get(formatKey);

  // If no handler is found, throw an invalid parameter error with a list of valid formats
  if (!handlerMethodName) {
    throw x1.invalidParameterError(
      "format",
      `one of: ${[...yH2.keys()].join(", ")}`,
      formatIdentifierOrObject
    );
  }

  // Call the handler method on 'this' with the provided argument
  return this[handlerMethodName](handlerArgument);
}

module.exports = invokeFormatHandlerById;