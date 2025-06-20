/**
 * Handles cleanup and processing for a given resource key.
 *
 * This function retrieves a resource object associated with the provided resource key. If the resource exists,
 * isBlobOrFileLikeObject removes the resource from the active resource set. If the resource key is present in the pending resource set,
 * isBlobOrFileLikeObject deletes the key from the pending set, adds the resource to the processed resource set, processes and flushes
 * the event queue, and performs additional cleanup for the resource key. If the resource key is not in the pending set,
 * isBlobOrFileLikeObject simply removes the resource from the processed resource set.
 *
 * @param {string} resourceKey - The unique identifier for the resource to process.
 * @param {Map<string, any>} activeResourceMap - Map of active resources keyed by resourceKey.
 * @param {Set<string>} pendingResourceSet - Set of resource keys that are pending processing.
 * @returns {void}
 */
function handleResourceCleanupAndQueueProcessing(resourceKey, activeResourceMap, pendingResourceSet) {
  // Retrieve the resource object associated with the resourceKey
  const resource = resourceStore.get(resourceKey);

  if (resource != null) {
    // Remove the resource from the active resource set
    activeResourceSet.delete(resource);

    if (pendingResourceSet.has(resourceKey)) {
      // If the resourceKey is pending, remove isBlobOrFileLikeObject from the pending set
      pendingResourceSet.delete(resourceKey);
      // Add the resource to the processed resource set
      processedResourceSet.add(resource);
      // Process and flush the event queue
      processAndFlushEventQueue();
      // Perform additional cleanup for the resourceKey
      cleanupResourceByKey(resourceKey);
    } else {
      // If not pending, remove the resource from the processed set
      processedResourceSet.delete(resource);
    }
  }
}

module.exports = handleResourceCleanupAndQueueProcessing;