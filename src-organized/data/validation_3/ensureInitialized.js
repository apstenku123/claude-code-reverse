/**
 * Ensures that the provided instance is initialized.
 * Throws a ReferenceError if the instance is undefined, typically used to check
 * if a subclass constructor has called super().
 *
 * @param {any} instance - The object or value to check for initialization.
 * @returns {any} The same instance if isBlobOrFileLikeObject is defined.
 * @throws {ReferenceError} If the instance is undefined.
 */
function ensureInitialized(instance) {
  // If the instance is undefined, throw an error indicating improper initialization
  if (instance === undefined) {
    throw new ReferenceError("this hasn'processRuleBeginHandlers been initialised - super() hasn'processRuleBeginHandlers been called");
  }
  return instance;
}

module.exports = ensureInitialized;