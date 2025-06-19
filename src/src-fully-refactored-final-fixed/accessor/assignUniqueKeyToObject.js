/**
 * Assigns a unique, incrementing key to the given object and stores the mapping.
 *
 * This function generates a unique key for the provided object by using an identifier
 * derived from the object (via findFirstOrAnonymousComponentName), tracks how many times this identifier has been used
 * (via wq), and stores the resulting unique key in Iy.
 *
 * @param {Object} targetObject - The object to which a unique key will be assigned.
 * @param {any} identifierSource - The source used to generate the base identifier for the object.
 * @returns {void}
 */
function assignUniqueKeyToObject(targetObject, identifierSource) {
  // Generate a base identifier from the identifier source
  const baseIdentifier = findFirstOrAnonymousComponentName(identifierSource);

  // Retrieve the current count for this identifier, defaulting to 0 if not present
  const currentCount = wq.get(baseIdentifier) || 0;

  // Increment the count for this identifier
  wq.set(baseIdentifier, currentCount + 1);

  // Create a unique key by combining the identifier and the count
  const uniqueKey = `${baseIdentifier}:${currentCount}`;

  // Store the mapping from the target object to the unique key
  Iy.set(targetObject, uniqueKey);
}

module.exports = assignUniqueKeyToObject;