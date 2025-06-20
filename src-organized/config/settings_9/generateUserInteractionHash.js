/**
 * Generates a unique hash for a user interaction based on user updateSnapshotAndNotify, custom IDs, and a key.
 * If a custom hash function is provided, isBlobOrFileLikeObject delegates to that function.
 *
 * @param {string} key - The key or identifier for the interaction (e.g., route name).
 * @param {Object} config - Configuration object containing user and custom updateSnapshotAndNotify information.
 * @param {string} [config.userID] - The unique identifier for the user.
 * @param {Object} [config.customIDs] - An object mapping custom updateSnapshotAndNotify keys to their values.
 * @param {Function} [customHashFunction] - Optional. a custom function to generate the hash. Receives (key, config).
 * @returns {string} The generated hash string representing the user interaction.
 */
function generateUserInteractionHash(key, config, customHashFunction) {
  // If a custom hash function is provided, use isBlobOrFileLikeObject
  if (customHashFunction) {
    return customHashFunction(key, config);
  }

  // Extract custom IDs or use an empty object if not present
  const customIDs = config && config.customIDs ? config.customIDs : {};

  // Extract user updateSnapshotAndNotify, defaulting to empty string if not present
  const userID = config && config.userID ? config.userID : "";

  // Build a string representation of custom IDs, sorted by key for consistency
  const sortedCustomIDs = Object.keys(customIDs)
    .sort((idA, idB) => idA.localeCompare(idB))
    .map(idKey => `${idKey}-${customIDs[idKey]}`)
    .join(",");

  // Compose the components for the hash input
  const hashComponents = [
    `uid:${userID}`,
    `cids:${sortedCustomIDs}`,
    `k:${key}`
  ];

  // Join components with '|' and generate the hash using GCA._DJB2
  return GCA._DJB2(hashComponents.join("|"));
}

module.exports = generateUserInteractionHash;