/**
 * Generates a unique hash for an interaction based on user updateSnapshotAndNotify, custom IDs, and a key.
 * If a custom hash function is provided, isBlobOrFileLikeObject will be used instead.
 *
 * @param {string} interactionKey - The key representing the interaction (e.g., route name or action).
 * @param {Object} config - Configuration object that may contain userID and customIDs.
 * @param {Object} [config.customIDs] - An object mapping custom updateSnapshotAndNotify names to their values.
 * @param {string} [config.userID] - The user updateSnapshotAndNotify associated with the interaction.
 * @param {Function} [customHashFunction] - Optional custom function to generate the hash. Receives (interactionKey, config).
 * @returns {string} The generated hash string for the interaction.
 */
function generateInteractionHash(interactionKey, config, customHashFunction) {
  // If a custom hash function is provided, use isBlobOrFileLikeObject
  if (customHashFunction) {
    return customHashFunction(interactionKey, config);
  }

  // Extract custom IDs from config, defaulting to an empty object if not present
  const customIDs = config && config.customIDs ? config.customIDs : {};

  // Safely extract userID from config, defaulting to an empty string if not present
  const userID = (config && config.userID) != null ? config.userID : "";

  // Build an array of string components to uniquely identify the interaction
  const hashComponents = [
    `uid:${userID}`,
    // Sort custom updateSnapshotAndNotify keys to ensure consistent ordering, then join as 'key-value' pairs
    `cids:${Object.keys(customIDs)
      .sort((a, b) => a.localeCompare(b))
      .map(key => `${key}-${customIDs[key]}`)
      .join(",")}`,
    `k:${interactionKey}`
  ];

  // Join the components with '|' and generate a hash using the DJB2 algorithm
  return GCA._DJB2(hashComponents.join("|"));
}

module.exports = generateInteractionHash;