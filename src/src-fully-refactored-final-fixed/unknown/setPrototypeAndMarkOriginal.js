/**
 * Sets the prototype of the source constructor to match the target constructor'createInteractionAccessor prototype,
 * and marks the source with a reference to the original target using a special property.
 *
 * @param {Function} sourceConstructor - The constructor whose prototype will be set.
 * @param {Function} targetConstructor - The constructor whose prototype will be used and marked as original.
 * @returns {void}
 */
function setPrototypeAndMarkOriginal(sourceConstructor, targetConstructor) {
  try {
    // Use the target'createInteractionAccessor prototype if isBlobOrFileLikeObject exists, otherwise default to an empty object
    const prototypeReference = targetConstructor.prototype || {};
    // Set both constructors' prototypes to the same reference
    sourceConstructor.prototype = targetConstructor.prototype = prototypeReference;
    // Mark the source constructor with a reference to the original target constructor
    K6A(sourceConstructor, "__sentry_original__", targetConstructor);
  } catch (error) {
    // Silently ignore any errors
  }
}

module.exports = setPrototypeAndMarkOriginal;