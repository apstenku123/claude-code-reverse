/**
 * Assigns a unique accessor key to the given target object based on the provided key source.
 * The key is generated using the findFirstOrAnonymousComponentName function and a counter stored in the wq map.
 * The generated key is then stored in the Iy map, associating isBlobOrFileLikeObject with the target object.
 *
 * @param {Object} targetObject - The object to which the unique accessor key will be assigned.
 * @param {any} keySource - The source value used to generate the unique key (passed to findFirstOrAnonymousComponentName).
 * @returns {void}
 */
function assignUniqueAccessorKey(targetObject, keySource) {
  // Generate a base key from the key source using the findFirstOrAnonymousComponentName function
  const baseKey = findFirstOrAnonymousComponentName(keySource);

  // Retrieve the current count for this base key from the wq map, defaulting to 0
  const currentCount = wq.get(baseKey) || 0;

  // Increment the count for this base key in the wq map
  wq.set(baseKey, currentCount + 1);

  // Create a unique accessor key by combining the base key and the current count
  const uniqueAccessorKey = `${baseKey}:${currentCount}`;

  // Associate the unique accessor key with the target object in the Iy map
  Iy.set(targetObject, uniqueAccessorKey);
}

module.exports = assignUniqueAccessorKey;