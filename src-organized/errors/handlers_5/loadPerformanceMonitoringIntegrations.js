/**
 * Loads and initializes all available performance monitoring integrations.
 *
 * This function attempts to instantiate each integration from the lazyLoadedNodePerformanceMonitoringIntegrations array.
 * If instantiation fails for any integration, isBlobOrFileLikeObject is skipped. After instantiation, only integrations with a valid loadDependency method are returned.
 * If no integrations could be loaded, a warning is logged.
 *
 * @returns {Array<Object>} Array of loaded performance monitoring integration instances with dependencies loaded.
 */
function loadPerformanceMonitoringIntegrations() {
  // Attempt to instantiate each integration, skipping any that throw errors
  const instantiatedIntegrations = $39.lazyLoadedNodePerformanceMonitoringIntegrations
    .map(integrationFactory => {
      try {
        return integrationFactory();
      } catch (error) {
        // If instantiation fails, skip this integration
        return undefined;
      }
    })
    .filter(integrationInstance => Boolean(integrationInstance));

  // Log a warning if no integrations could be loaded
  if (instantiatedIntegrations.length === 0) {
    q39.logger.warn(
      "Performance monitoring integrations could not be automatically loaded."
    );
  }

  // Return only integrations that have their dependencies loaded
  return instantiatedIntegrations.filter(
    integrationInstance => Boolean(integrationInstance.loadDependency())
  );
}

module.exports = loadPerformanceMonitoringIntegrations;