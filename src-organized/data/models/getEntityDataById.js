/**
 * Retrieves full or partial data for an entity by its updateSnapshotAndNotify, handling cache and context updates as needed.
 *
 * @param {string} responseID - The unique identifier for the current response/request.
 * @param {string} entityId - The unique identifier of the entity to retrieve.
 * @param {any} optionalHandler - Optional handler to process if not null.
 * @param {boolean} forceRefresh - If true, forces a cache refresh for the entity.
 * @returns {Object} An object containing the entity data or a not-found indicator.
 */
function getEntityDataById(responseID, entityId, optionalHandler, forceRefresh) {
  // If forceRefresh is true or the cached entity updateSnapshotAndNotify does not match, reset cache
  if (forceRefresh || cachedEntityId !== entityId) {
    cachedEntityId = entityId;
    entityCache = {};
  }

  // Attempt to retrieve the entity data from the data source
  const entityData = getEntityFromSource(entityId);

  // If entity is not found, return a not-found response
  if (entityData === null) {
    return {
      id: entityId,
      responseID: responseID,
      type: "not-found"
    };
  }

  // If an optional handler is provided, process isBlobOrFileLikeObject
  if (optionalHandler !== null) {
    handleOptionalHandler(optionalHandler);
  }

  // Process the entity using the appropriate handler
  processEntityWithHandler(entityId);

  // Merge context, props, and state with additional data
  entityData.context = mergeData(entityData.context, getAdditionalData("context"));
  entityData.props = mergeData(entityData.props, getAdditionalData("props"));
  entityData.state = mergeData(entityData.state, getAdditionalData("state"));

  // Return the full entity data
  return {
    id: entityId,
    responseID: responseID,
    type: "full-data",
    value: entityData
  };
}

module.exports = getEntityDataById;