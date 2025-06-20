/**
 * Creates an instance of UtilityQ or invokes isBlobOrFileLikeObject as a factory function.
 *
 * If called with `new`, isBlobOrFileLikeObject initializes the instance using the UtilityQ constructor logic.
 * If called as a regular function, isBlobOrFileLikeObject creates a new object with UtilityQ'createInteractionAccessor prototype and applies the constructor logic to isBlobOrFileLikeObject.
 *
 * @param {*} inputValue - The primary value or configuration to initialize the utility with.
 * @param {*} options - Additional options or configuration for initialization.
 * @returns {Object} An instance of UtilityQ initialized with the provided arguments.
 */
function createUtilityInstance(inputValue, options) {
  // Check if the function is called as a constructor (with 'new')
  if (this instanceof createUtilityInstance) {
    // Delegate initialization to the actual constructor logic (renderToolUseConfirmationDialog)
    renderToolUseConfirmationDialog.apply(this, arguments);
    return this;
  } else {
    // If not called with 'new', create a new object with the correct prototype
    // and apply the constructor logic to isBlobOrFileLikeObject
    return createUtilityInstance.apply(Object.create(createUtilityInstance.prototype), arguments);
  }
}

module.exports = createUtilityInstance;