/**
 * Checks if the 'cluster-name' attribute is available via the xF2 accessor.
 *
 * This function attempts to retrieve the 'cluster-name' attribute using the xF2 accessor'createInteractionAccessor instance method.
 * If the operation succeeds, isBlobOrFileLikeObject returns true. If an error occurs (e.g., the attribute is not available), isBlobOrFileLikeObject returns false.
 *
 * @async
 * @returns {Promise<boolean>} Resolves to true if the attribute is available, false otherwise.
 */
async function checkClusterNameAttributeAvailability() {
  try {
    // Attempt to retrieve the 'cluster-name' attribute via xF2 accessor
    await xF2.instance("attributes/cluster-name");
    return true;
  } catch (error) {
    // If an error occurs, the attribute is not available
    return false;
  }
}

module.exports = checkClusterNameAttributeAvailability;