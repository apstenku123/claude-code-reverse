/**
 * Determines if the provided object is an instance of tz.Namespace or tz.Root.
 *
 * @param {object} objectToCheck - The object to test for tz.Namespace or tz.Root instance.
 * @returns {boolean} True if the object is an instance of tz.Namespace or tz.Root, otherwise false.
 */
function isTzNamespaceOrRoot(objectToCheck) {
  // Check if the object is an instance of tz.Namespace or tz.Root
  return objectToCheck instanceof tz.Namespace || objectToCheck instanceof tz.Root;
}

module.exports = isTzNamespaceOrRoot;