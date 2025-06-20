/**
 * Checks if the 'cluster-name' attribute exists by invoking the xF2.instance method.
 *
 * @async
 * @function checkClusterNameAttributeExists
 * @returns {Promise<boolean>} Returns true if the attribute exists or the call succeeds, false otherwise.
 */
async function checkClusterNameAttributeExists() {
  try {
    // Attempt to access the 'cluster-name' attribute using the xF2 singleton instance
    await xF2.instance("attributes/cluster-name");
    return true;
  } catch (error) {
    // If an error occurs (e.g., attribute does not exist), return false
    return false;
  }
}

module.exports = checkClusterNameAttributeExists;