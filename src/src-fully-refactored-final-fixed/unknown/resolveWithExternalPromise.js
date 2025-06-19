/**
 * Resolves a promise using the external 'C' object'createInteractionAccessor resolve method.
 *
 * @returns {Promise<any>} a promise resolved by the external 'C' object'createInteractionAccessor resolve method.
 */
function resolveWithExternalPromise() {
  // Delegate promise resolution to the external 'C' object'createInteractionAccessor resolve method
  return C.resolve();
}

module.exports = resolveWithExternalPromise;