/**
 * Checks if the provided object is an instance of tz.Namespace or tz.Root.
 *
 * @param {object} objectToCheck - The object to check for type.
 * @returns {boolean} True if the object is an instance of tz.Namespace or tz.Root, otherwise false.
 */
function isNamespaceOrRoot(objectToCheck) {
  // Return true if objectToCheck is an instance of either tz.Namespace or tz.Root
  return objectToCheck instanceof tz.Namespace || objectToCheck instanceof tz.Root;
}

module.exports = isNamespaceOrRoot;