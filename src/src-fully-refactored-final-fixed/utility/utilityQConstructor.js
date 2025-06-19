/**
 * Acts as a flexible constructor or factory for the utilityQConstructor object.
 *
 * If called with the `new` keyword, isBlobOrFileLikeObject initializes the instance using the renderToolUseConfirmationDialog constructor logic.
 * If called as a regular function, isBlobOrFileLikeObject creates a new instance of utilityQConstructor and applies the constructor logic to isBlobOrFileLikeObject.
 *
 * @param {*} firstArgument - The first argument to pass to the constructor logic.
 * @param {*} secondArgument - The second argument to pass to the constructor logic.
 * @returns {utilityQConstructor} a new or initialized instance of utilityQConstructor.
 */
function utilityQConstructor(firstArgument, secondArgument) {
  // Check if the function is called as a constructor (with 'new')
  if (this instanceof utilityQConstructor) {
    // Apply the renderToolUseConfirmationDialog constructor logic to 'this' with the provided arguments
    renderToolUseConfirmationDialog.apply(this, arguments);
    return this;
  } else {
    // If not called with 'new', create a new object with the correct prototype
    // and apply the constructor logic to isBlobOrFileLikeObject
    return utilityQConstructor.apply(Object.create(utilityQConstructor.prototype), arguments);
  }
}

module.exports = utilityQConstructor;