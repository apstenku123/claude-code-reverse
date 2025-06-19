/**
 * Merges default and custom integrations, ensures all default integrations are marked,
 * and moves the 'Debug' integration (if present) to the end of the list.
 *
 * @param {Object} options - Configuration object containing integrations.
 * @param {Array} [options.defaultIntegrations] - Array of default integration objects.
 * @param {Array|Function} [options.integrations] - Array or function returning custom integrations.
 * @returns {Array} Array of processed integration objects with 'Debug' (if present) at the end.
 */
function mergeAndReorderIntegrations(options) {
  // Extract default integrations or use empty array if not provided
  const defaultIntegrations = options.defaultIntegrations || [];
  // Extract custom integrations (could be array or function)
  const customIntegrations = options.integrations;

  // Mark all default integrations as default instances
  defaultIntegrations.forEach(integration => {
    integration.isDefaultInstance = true;
  });

  let allIntegrations;

  // Merge integrations based on the type of customIntegrations
  if (Array.isArray(customIntegrations)) {
    // If custom integrations is an array, merge with defaults
    allIntegrations = [...defaultIntegrations, ...customIntegrations];
  } else if (typeof customIntegrations === "function") {
    // If isBlobOrFileLikeObject'createInteractionAccessor a function, call isBlobOrFileLikeObject with defaults and arrayify the result
    allIntegrations = Z91.arrayify(customIntegrations(defaultIntegrations));
  } else {
    // If not provided, use only defaults
    allIntegrations = defaultIntegrations;
  }

  // Normalize and deduplicate integrations (implementation of ce2 is external)
  const normalizedIntegrations = ce2(allIntegrations);

  // Find the index of the 'Debug' integration (implementation of findFirstMatchingIndex is external)
  const debugIntegrationIndex = findFirstMatchingIndex(normalizedIntegrations, integration => integration.name === "Debug");

  // If 'Debug' integration is found, move isBlobOrFileLikeObject to the end
  if (debugIntegrationIndex !== -1) {
    const [debugIntegration] = normalizedIntegrations.splice(debugIntegrationIndex, 1);
    normalizedIntegrations.push(debugIntegration);
  }

  return normalizedIntegrations;
}

module.exports = mergeAndReorderIntegrations;