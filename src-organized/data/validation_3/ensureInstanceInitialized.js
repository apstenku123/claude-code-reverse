/**
 * Ensures that a class instance has been properly initialized.
 * Throws a ReferenceError if the instance is undefined, which typically indicates
 * that the superclass constructor (super()) has not been called in a subclass constructor.
 *
 * @param {object} instance - The class instance to check for initialization.
 * @returns {object} The validated, initialized instance.
 * @throws {ReferenceError} If the instance is undefined (not initialized).
 */
function ensureInstanceInitialized(instance) {
  // If the instance is undefined, throw a descriptive ReferenceError
  if (instance === undefined) {
    throw new ReferenceError("this hasn'processRuleBeginHandlers been initialised - super() hasn'processRuleBeginHandlers been called");
  }
  // Return the validated instance
  return instance;
}

module.exports = ensureInstanceInitialized;