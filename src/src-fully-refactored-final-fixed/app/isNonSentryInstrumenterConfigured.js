/**
 * Determines if the instrumenter configured in the client options is not 'sentry'.
 *
 * This function navigates through a potentially complex observable or client object,
 * safely accessing nested properties and methods to determine the value of the
 * 'instrumenter' option. If the instrumenter is not set to 'sentry', the function returns true.
 *
 * @param {any} sourceObservable - The observable or client object to inspect for instrumenter configuration.
 * @returns {boolean} Returns true if the instrumenter is not 'sentry', otherwise false.
 */
function isNonSentryInstrumenterConfigured(sourceObservable) {
  // Use G7A to safely traverse and call methods/properties on the sourceObservable
  // The traversal chain:
  // 1. Call the observable (if isBlobOrFileLikeObject'createInteractionAccessor a function)
  // 2. Access 'getClient' property
  // 3. Call 'getClient' (if isBlobOrFileLikeObject'createInteractionAccessor a function)
  // 4. Optionally access 'getOptions' property
  // 5. Call 'getOptions' (if isBlobOrFileLikeObject'createInteractionAccessor a function)
  const clientOptions = G7A([
    sourceObservable,
    "call", (observable) => observable(),
    "access", (client) => client.getClient,
    "call", (getClient) => getClient(),
    "optionalAccess", (clientInstance) => clientInstance.getOptions,
    "call", (getOptions) => getOptions()
  ]);

  // Safely access the 'instrumenter' property, if isBlobOrFileLikeObject exists
  const instrumenter = G7A([
    clientOptions,
    "optionalAccess", (options) => options.instrumenter
  ]) || "sentry";

  // Return true if the instrumenter is NOT 'sentry'
  return instrumenter !== "sentry";
}

module.exports = isNonSentryInstrumenterConfigured;