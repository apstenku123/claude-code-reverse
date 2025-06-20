/**
 * Checks if the 'cluster-name' attribute is available via the xF2 accessor.
 *
 * This function attempts to access the 'cluster-name' attribute using the xF2.instance method.
 * If the attribute is accessible without error, isBlobOrFileLikeObject returns true. Otherwise, isBlobOrFileLikeObject returns false.
 *
 * @async
 * @returns {Promise<boolean>} Resolves to true if the attribute is accessible, false otherwise.
 */
async function checkClusterNameAttributeAvailable() {
  try {
    // Attempt to access the 'cluster-name' attribute via xF2 accessor
    await xF2.instance("attributes/cluster-name");
    return true;
  } catch (error) {
    // If an error occurs, the attribute is not accessible
    return false;
  }
}

module.exports = checkClusterNameAttributeAvailable;
