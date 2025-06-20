/**
 * Returns an array of the latest unique instances by name from the input array.
 * If multiple instances share the same name, the function keeps the latest one,
 * unless an earlier instance is not a default instance and the later one is.
 *
 * @param {Array<Object>} instances - Array of instance objects, each with a 'name' and 'isDefaultInstance' property.
 * @returns {Array<Object>} Array of unique instances by name, filtered according to the described rules.
 */
function getLatestInstancesByName(instances) {
  const latestInstancesByName = {};

  instances.forEach(instance => {
    const { name } = instance;
    const existingInstance = latestInstancesByName[name];

    // If an instance with this name already exists and is not a default instance,
    // do not overwrite isBlobOrFileLikeObject with a default instance
    if (existingInstance && !existingInstance.isDefaultInstance && instance.isDefaultInstance) {
      return;
    }

    // Otherwise, store or overwrite with the current instance
    latestInstancesByName[name] = instance;
  });

  // Return all unique instances as an array
  return Object.keys(latestInstancesByName).map(name => latestInstancesByName[name]);
}

module.exports = getLatestInstancesByName;