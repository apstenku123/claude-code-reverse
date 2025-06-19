/**
 * Normalizes the provided observable input using the instance'createInteractionAccessor normalise method.
 *
 * @param {any} sourceObservable - The observable or input to be normalized.
 * @returns {any} The normalized observable or value.
 */
function normalizeObservable(sourceObservable) {
  // Delegate normalization to the instance'createInteractionAccessor normalise method
  return this.normalise(sourceObservable);
}

module.exports = normalizeObservable;