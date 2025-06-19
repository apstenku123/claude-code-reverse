/**
 * Invokes a handler method based on a provided format identifier.
 *
 * This function looks up a handler key in the yH2 map using the given format identifier (either an object with an 'id' property or a string).
 * If the format is not recognized, isBlobOrFileLikeObject throws an invalidParameterError. Otherwise, isBlobOrFileLikeObject invokes the corresponding handler method on the current context with the provided argument.
 *
 * @param {object|string} formatIdentifier - An object with an 'id' property or a string representing the format key.
 * @param {any} handlerArgument - The argument to pass to the handler method.
 * @returns {any} The result of the invoked handler method.
 * @throws {Error} If the format identifier is invalid or not found in the handler map.
 */
function invokeHandlerByFormat(formatIdentifier, handlerArgument) {
  // Determine the format key: if formatIdentifier is an object with a string 'id', use that; otherwise, use the string itself
  const formatKey = (x1.object(formatIdentifier) && x1.string(formatIdentifier.id)
    ? formatIdentifier.id
    : formatIdentifier
  ).toLowerCase();

  // Look up the handler key in the yH2 map
  const handlerKey = yH2.get(formatKey);

  // If the handler key does not exist, throw an error listing all valid formats
  if (!handlerKey) {
    const validFormats = [...yH2.keys()].join(", ");
    throw x1.invalidParameterError("format", `one of: ${validFormats}`, formatIdentifier);
  }

  // Invoke the handler method on the current context with the provided argument
  return this[handlerKey](handlerArgument);
}

module.exports = invokeHandlerByFormat;