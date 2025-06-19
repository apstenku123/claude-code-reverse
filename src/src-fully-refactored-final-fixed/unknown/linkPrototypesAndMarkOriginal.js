/**
 * Links the prototypes of two constructor functions and marks the original constructor for reference.
 *
 * This function sets the prototype of the source constructor to the prototype of the target constructor,
 * then marks the source with a reference to the original target constructor using the '__sentry_original__' property.
 *
 * @param {Function} sourceConstructor - The constructor whose prototype will be linked and marked.
 * @param {Function} targetConstructor - The constructor whose prototype will be used as the base and marked as original.
 * @returns {void}
 */
function linkPrototypesAndMarkOriginal(sourceConstructor, targetConstructor) {
  try {
    // Use the target'createInteractionAccessor prototype if isBlobOrFileLikeObject exists, otherwise default to an empty object
    const basePrototype = targetConstructor.prototype || {};
    // Link both constructors to share the same prototype object
    sourceConstructor.prototype = targetConstructor.prototype = basePrototype;
    // Mark the source constructor with a reference to the original target constructor
    K6A(sourceConstructor, "__sentry_original__", targetConstructor);
  } catch (error) {
    // Silently ignore errors (e.g., if prototype assignment fails)
  }
}

module.exports = linkPrototypesAndMarkOriginal;