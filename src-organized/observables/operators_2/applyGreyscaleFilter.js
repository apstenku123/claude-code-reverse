/**
 * Applies a greyscale filter to the provided image data or observable.
 *
 * @param {any} sourceObservable - The image data or observable to which the greyscale filter will be applied.
 * @returns {any} The result of applying the greyscale filter to the input.
 */
function applyGreyscaleFilter(sourceObservable) {
  // Delegate to the greyscale method of the current context
  return this.greyscale(sourceObservable);
}

module.exports = applyGreyscaleFilter;