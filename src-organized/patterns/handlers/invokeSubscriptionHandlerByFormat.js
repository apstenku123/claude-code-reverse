/**
 * Invokes a subscription handler based on the provided format identifier.
 *
 * This function looks up a handler in the yH2 map using the provided format (either as an object with an 'id' property or as a string),
 * validates the format, and then calls the corresponding handler with the given configuration.
 *
 * @param {object|string} formatIdentifier - The format identifier, either as an object with an 'id' property (string) or as a string.
 * @param {any} handlerConfig - The configuration or argument to pass to the subscription handler.
 * @returns {any} The result of the invoked subscription handler.
 * @throws {Error} If the format identifier is invalid or not found in the yH2 map.
 */
function invokeSubscriptionHandlerByFormat(formatIdentifier, handlerConfig) {
  // Determine the format key: if formatIdentifier is an object with a string 'id', use that; otherwise, use formatIdentifier as string
  const formatKey = (x1.object(formatIdentifier) && x1.string(formatIdentifier.id)
    ? formatIdentifier.id
    : formatIdentifier
  ).toLowerCase();

  // Attempt to retrieve the subscription handler key from yH2 map
  const subscriptionHandlerKey = yH2.get(formatKey);

  // If no handler is found, throw an invalid parameter error listing all valid formats
  if (!subscriptionHandlerKey) {
    throw x1.invalidParameterError(
      "format",
      `one of: ${[...yH2.keys()].join(", ")}`,
      formatIdentifier
    );
  }

  // Call the handler method on 'this' with the provided configuration
  return this[subscriptionHandlerKey](handlerConfig);
}

module.exports = invokeSubscriptionHandlerByFormat;