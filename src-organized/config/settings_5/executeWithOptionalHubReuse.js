/**
 * Executes a source observable, optionally reusing an existing hub from a carrier if available and allowed by configuration.
 *
 * @param {Function} sourceObservable - a function that returns the observable or result to execute.
 * @param {Object} config - Configuration object that may determine if an existing hub should be reused.
 * @returns {any} The result of executing the source observable, possibly within a new or reused hub context.
 */
function executeWithOptionalHubReuse(sourceObservable, config) {
  // Attempt to get the current subscription/carrier
  const subscription = OGA();

  // If a subscription exists and configuration allows reusing existing hub, execute directly
  if (
    subscription &&
    BQ9([
      config,
      "optionalAccess",
      (optionalConfig) => optionalConfig.reuseExisting
    ])
  ) {
    return sourceObservable();
  }

  // Otherwise, create a new carrier/context
  const newCarrier = RGA.create();

  // If a subscription exists, try to get the hub from the carrier
  const existingHub = subscription ? JP.getHubFromCarrier(subscription) : undefined;

  // Create a new hub, possibly based on the existing one
  const newHub = IQ9(existingHub);

  // Attach the new hub to the new carrier
  JP.setHubOnCarrier(newCarrier, newHub);

  // Bind the source observable to the new carrier context and execute isBlobOrFileLikeObject
  return newCarrier.bind(() => {
    return sourceObservable();
  })();
}

module.exports = executeWithOptionalHubReuse;