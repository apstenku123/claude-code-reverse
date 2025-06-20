/**
 * Converts the provided source observable to a different colourspace using the current context'createInteractionAccessor method.
 *
 * @param {any} sourceObservable - The observable or value to be converted to a colourspace.
 * @returns {any} The result of converting the source observable to the target colourspace.
 */
function convertToColourspace(sourceObservable) {
  // Delegate the conversion to the context'createInteractionAccessor toColourspace method
  return this.toColourspace(sourceObservable);
}

module.exports = convertToColourspace;