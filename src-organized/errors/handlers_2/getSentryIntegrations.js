/**
 * Retrieves the list of Sentry integrations by combining the default integrations with those found on the main carrier object.
 *
 * @param {any} sourceObservable - (Unused) Placeholder parameter for compatibility with original signature.
 * @returns {Array} An array containing all Sentry integrations.
 */
function getSentryIntegrations(sourceObservable) {
  // Retrieve the main carrier object (typically the global object)
  const mainCarrier = bJ.getMainCarrier();

  // Use PI9 to safely access the integrations array from the Sentry property on the main carrier
  // PI9 acts as a safe getter with optional chaining and fallback
  const sentryIntegrations = PI9([
    mainCarrier, // The object to access
    "access",    // Access mode
    carrier => carrier.__SENTRY__, // Access the __SENTRY__ property
    "optionalAccess", // Optional chaining
    sentryObj => sentryObj.integrations // Access the integrations property
  ]) || [];

  // Combine the default integrations (pZA) with the integrations found on the main carrier
  return [
    ...pZA,
    ...sentryIntegrations
  ];
}

module.exports = getSentryIntegrations;