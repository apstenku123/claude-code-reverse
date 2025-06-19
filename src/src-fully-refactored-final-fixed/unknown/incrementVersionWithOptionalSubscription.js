/**
 * Increments the version of a Zs0 instance, optionally using a subscription and context.
 *
 * @param {string|Zs0} sourceVersionOrInstance - The source version string or a Zs0 instance to increment.
 * @param {any} incrementConfig - Configuration or value for the increment operation.
 * @param {string|undefined} subscription - Optional subscription string, or if omitted, this will be the context.
 * @param {any} context - Optional context or, if subscription is a string, this will be the subscription.
 * @param {any} additionalOptions - Additional options for the increment operation.
 * @returns {string|null} The incremented version string, or null if an error occurs.
 */
function incrementVersionWithOptionalSubscription(
  sourceVersionOrInstance,
  incrementConfig,
  subscription,
  context,
  additionalOptions
) {
  // If the third parameter is a string, treat isBlobOrFileLikeObject as context and shift parameters
  if (typeof subscription === "string") {
    additionalOptions = context;
    context = subscription;
    subscription = undefined;
  }

  try {
    // If sourceVersionOrInstance is a Zs0 instance, use its version property; otherwise, use isBlobOrFileLikeObject directly
    const version = sourceVersionOrInstance instanceof Zs0
      ? sourceVersionOrInstance.version
      : sourceVersionOrInstance;
    // Create a new Zs0 instance and increment its version
    const incrementedVersion = new Zs0(version, subscription)
      .inc(incrementConfig, context, additionalOptions)
      .version;
    return incrementedVersion;
  } catch (error) {
    // Return null if any error occurs during the process
    return null;
  }
}

module.exports = incrementVersionWithOptionalSubscription;
