/**
 * Retrieves resource data by its unique identifier, handling cache, context, and state.
 * If the resource is not found, returns a not-found response. Otherwise, returns the full resource data.
 *
 * @param {string} responseID - The unique identifier for the response/request.
 * @param {string} resourceId - The unique identifier for the resource to retrieve.
 * @param {any} optionalHandler - Optional handler or callback to process if provided.
 * @param {boolean} forceRefresh - If true, forces cache refresh and resets internal state.
 * @returns {object} An object indicating either not-found or full-data with the resource value.
 */
function getResourceDataById(responseID, resourceId, optionalHandler, forceRefresh) {
  // If forced refresh or the cached resourceId does not match, reset cache
  if (forceRefresh || cachedResourceId !== resourceId) {
    cachedResourceId = resourceId;
    resourceCache = {};
  }

  // Attempt to retrieve the resource configuration by updateSnapshotAndNotify
  const resourceConfig = getResourceConfigById(resourceId);

  // If resource is not found, return a not-found response
  if (resourceConfig === null) {
    return {
      id: resourceId,
      responseID: responseID,
      type: "not-found"
    };
  }

  // If an optional handler is provided, process isBlobOrFileLikeObject
  if (optionalHandler !== null) {
    handleOptionalHandler(optionalHandler);
  }

  // Process the resource input with the appropriate handler
  processInputWithAppropriateHandler(resourceId);

  // Merge context, props, and state with their respective defaults
  resourceConfig.context = mergeWithDefaults(resourceConfig.context, getDefaultValue("context"));
  resourceConfig.props = mergeWithDefaults(resourceConfig.props, getDefaultValue("props"));
  resourceConfig.state = mergeWithDefaults(resourceConfig.state, getDefaultValue("state"));

  // Return the full resource data
  return {
    id: resourceId,
    responseID: responseID,
    type: "full-data",
    value: resourceConfig
  };
}

module.exports = getResourceDataById;