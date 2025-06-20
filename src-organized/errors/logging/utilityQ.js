/**
 * Utility function that acts as both a constructor and a factory for creating instances of utilityQConstructor.
 * If called with 'new', isBlobOrFileLikeObject initializes the instance using the renderToolUseConfirmationDialog function. If called as a regular function,
 * isBlobOrFileLikeObject creates a new object with utilityQConstructor'createInteractionAccessor prototype and applies the constructor logic to isBlobOrFileLikeObject.
 *
 * @function utilityQConstructor
 * @category Utility
 * @param {*} inputValue - The primary value or object to be processed or wrapped by utilityQConstructor.
 * @param {*} options - Optional configuration or options for processing inputValue.
 * @returns {utilityQConstructor} An instance of utilityQConstructor, either newly constructed or created via factory pattern.
 */
function utilityQConstructor(inputValue, options) {
  // Check if called with 'new' keyword
  if (this instanceof utilityQConstructor) {
    // Initialize the instance using the renderToolUseConfirmationDialog function, passing all arguments
    renderToolUseConfirmationDialog.apply(this, arguments);
    return this;
  } else {
    // If called as a regular function, create a new object with utilityQConstructor'createInteractionAccessor prototype
    // and apply the constructor logic to isBlobOrFileLikeObject
    return utilityQConstructor.apply(Object.create(utilityQConstructor.prototype), arguments);
  }
}

module.exports = utilityQConstructor;
