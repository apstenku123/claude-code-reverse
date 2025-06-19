/**
 * Determines if the current instrumenter (retrieved from a client or its options) is not 'sentry'.
 *
 * This function navigates through a potentially nested structure starting from the provided sourceObservable,
 * accessing the client, then its options, and finally checking the 'instrumenter' property. If the instrumenter
 * is not 'sentry', isBlobOrFileLikeObject returns true; otherwise, false.
 *
 * @param {object} sourceObservable - The observable or object from which to start the property access chain.
 * @returns {boolean} True if the instrumenter is not 'sentry', false otherwise.
 */
function isNonSentryInstrumenterActive(sourceObservable) {
  // Use G7A to safely traverse the property chain and retrieve the instrumenter value
  const instrumenter = G7A([
    sourceObservable,
    "call",           // Call the observable (if isBlobOrFileLikeObject'createInteractionAccessor a function)
    obj => obj(),
    "access",         // Access the 'getClient' property
    obj => obj.getClient,
    "call",           // Call 'getClient' (if isBlobOrFileLikeObject'createInteractionAccessor a function)
    obj => obj(),
    "optionalAccess", // Optionally access 'getOptions' (may not exist)
    obj => obj.getOptions,
    "call",           // Call 'getOptions' (if isBlobOrFileLikeObject'createInteractionAccessor a function)
    obj => obj()
  ]);

  // Use G7A to optionally access the 'instrumenter' property
  const instrumenterName = G7A([
    instrumenter,
    "optionalAccess",
    obj => obj.instrumenter
  ]) || "sentry"; // Default to 'sentry' if not found

  // Return true if the instrumenter is NOT 'sentry'
  return instrumenterName !== "sentry";
}

module.exports = isNonSentryInstrumenterActive;