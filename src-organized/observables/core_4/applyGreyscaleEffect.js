/**
 * Applies a greyscale effect to the provided image data or observable.
 *
 * @param {any} sourceObservable - The image data or observable to which the greyscale effect will be applied.
 * @returns {any} The result of applying the greyscale effect, as returned by the greyscale method.
 */
function applyGreyscaleEffect(sourceObservable) {
  // Delegate to the greyscale method of the current context
  return this.greyscale(sourceObservable);
}

module.exports = applyGreyscaleEffect;