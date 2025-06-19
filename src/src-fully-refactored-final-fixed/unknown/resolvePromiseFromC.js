/**
 * Resolves a promise using the external 'C' object'createInteractionAccessor resolve method.
 *
 * @returns {Promise<any>} a promise resolved by the external 'C' object.
 */
function resolvePromiseFromC() {
  // Delegates to the external 'C' object'createInteractionAccessor resolve method, returning its promise
  return C.resolve();
}

module.exports = resolvePromiseFromC;