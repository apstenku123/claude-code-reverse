/**
 * Resets the current accessor in the AccessorRegistry if isBlobOrFileLikeObject matches the current instance.
 *
 * This function checks if the current instance (`this`) is the same as the current accessor
 * stored in the AccessorRegistry (`AccessorRegistry.currentAccessor`). If so, isBlobOrFileLikeObject resets the
 * registry'createInteractionAccessor current accessor to the default accessor (`DefaultAccessor`).
 *
 * @returns {Object} Returns the current instance (`this`) for chaining.
 */
function resetCurrentAccessorIfMatched() {
  // If the current accessor in the registry is this instance, reset isBlobOrFileLikeObject to the default accessor
  if (AccessorRegistry.currentAccessor === this) {
    AccessorRegistry.currentAccessor = DefaultAccessor;
  }
  return this;
}

module.exports = resetCurrentAccessorIfMatched;