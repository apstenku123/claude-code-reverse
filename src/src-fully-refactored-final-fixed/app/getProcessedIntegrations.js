/**
 * Processes and combines default and custom integrations, ensuring that the Debug integration (if present) is moved to the end of the array.
 *
 * @param {Object} options - The configuration object containing integration settings.
 * @param {Array} [options.defaultIntegrations] - The array of default integration objects.
 * @param {Array|Function} [options.integrations] - Additional integrations as an array or a function that returns an array.
 * @returns {Array} The processed array of integration objects, with Debug (if present) at the end.
 */
function getProcessedIntegrations(options) {
  const defaultIntegrations = options.defaultIntegrations || [];
  const customIntegrations = options.integrations;

  // Mark all default integrations as default instances
  defaultIntegrations.forEach(integration => {
    integration.isDefaultInstance = true;
  });

  let allIntegrations;

  // Combine default and custom integrations based on the type of customIntegrations
  if (Array.isArray(customIntegrations)) {
    allIntegrations = [...defaultIntegrations, ...customIntegrations];
  } else if (typeof customIntegrations === "function") {
    // Z91.arrayify ensures the result is always an array
    allIntegrations = Z91.arrayify(customIntegrations(defaultIntegrations));
  } else {
    allIntegrations = defaultIntegrations;
  }

  // ce2 processes the integrations further (e.g., deduplication, normalization)
  const processedIntegrations = ce2(allIntegrations);

  // findFirstMatchingIndex finds the index of the Debug integration
  const debugIntegrationIndex = findFirstMatchingIndex(processedIntegrations, integration => integration.name === "Debug");

  // If Debug integration exists, move isBlobOrFileLikeObject to the end
  if (debugIntegrationIndex !== -1) {
    const [debugIntegration] = processedIntegrations.splice(debugIntegrationIndex, 1);
    processedIntegrations.push(debugIntegration);
  }

  return processedIntegrations;
}

module.exports = getProcessedIntegrations;