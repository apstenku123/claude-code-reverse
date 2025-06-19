/**
 * Generates a deterministic hash based on user updateSnapshotAndNotify, custom IDs, and a key, unless a custom hash function is provided.
 *
 * @param {string} key - The key or identifier for the action or entity.
 * @param {Object} config - Configuration object containing user and custom updateSnapshotAndNotify information.
 * @param {Function} [customHashFunction] - Optional custom function to generate the hash.
 * @returns {string} Deterministic hash string for the given input.
 */
function generateDeterministicHashForUserAction(key, config, customHashFunction) {
  // If a custom hash function is provided, use isBlobOrFileLikeObject
  if (customHashFunction) {
    return customHashFunction(key, config);
  }

  // Extract customIDs from config, defaulting to an empty object if not present
  const customIDs = config && config.customIDs ? config.customIDs : {};

  // Safely extract userID, defaulting to an empty string if not present
  const userID = (config && config.userID) != null ? config.userID : "";

  // Build a string representing sorted custom IDs in the format: key1-value1,key2-value2,...
  const sortedCustomIDsString = Object.keys(customIDs)
    .sort((keyA, keyB) => keyA.localeCompare(keyB))
    .map(customKey => `${customKey}-${customIDs[customKey]}`)
    .join(",");

  // Compose the array of identifying strings
  const hashComponents = [
    `uid:${userID}`,
    `cids:${sortedCustomIDsString}`,
    `k:${key}`
  ];

  // Join components with '|' and generate the hash using GCA._DJB2
  return GCA._DJB2(hashComponents.join("|"));
}

module.exports = generateDeterministicHashForUserAction;