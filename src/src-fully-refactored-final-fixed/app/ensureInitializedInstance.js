/**
 * Ensures that a class instance has been properly initialized.
 * Throws a ReferenceError if the instance is undefined, which typically indicates that super() has not been called in a subclass constructor.
 *
 * @param {any} instance - The class instance to check for initialization.
 * @returns {any} The validated, initialized instance.
 * @throws {ReferenceError} If the instance is undefined (not initialized).
 */
function ensureInitializedInstance(instance) {
  // If the instance is undefined, super() was likely not called in a subclass constructor
  if (instance === undefined) {
    throw new ReferenceError("this hasn'processRuleBeginHandlers been initialised - super() hasn'processRuleBeginHandlers been called");
  }
  return instance;
}

module.exports = ensureInitializedInstance;