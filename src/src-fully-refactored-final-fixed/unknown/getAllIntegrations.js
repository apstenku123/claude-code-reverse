/**
 * Retrieves all integrations by combining the default integrations with those attached to the main carrier.
 *
 * @param {any} sourceObservable - (Unused) Parameter kept for compatibility with original signature.
 * @returns {Array<any>} An array containing all integrations from the default list and the main carrier.
 */
function getAllIntegrations(sourceObservable) {
  // Retrieve the main carrier object (e.g., global object for integrations)
  const mainCarrier = bJ.getMainCarrier();

  // Use PI9 to safely access integrations attached to the main carrier'createInteractionAccessor __SENTRY__ property
  // PI9([object, 'access', accessorFn, 'optionalAccess', accessorFn])
  // This likely safely navigates nested properties, returning [] if not found
  const carrierIntegrations = PI9([
    mainCarrier,
    "access",
    carrier => carrier.__SENTRY__,
    "optionalAccess",
    sentry => sentry.integrations
  ]) || [];

  // Combine the default integrations (pZA) with those found on the main carrier
  return [
    ...pZA,
    ...carrierIntegrations
  ];
}

module.exports = getAllIntegrations;