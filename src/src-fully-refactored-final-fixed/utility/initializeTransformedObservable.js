/**
 * Applies a specific transformation to an observable using a predefined operator and configuration.
 * Initializes the observable'createInteractionAccessor index and sibling properties.
 *
 * @param {Object} sourceObservable - The observable object to be transformed.
 * @param {Object} transformationConfig - The configuration object for the transformation.
 * @returns {Object} The transformed observable with initialized properties.
 */
function initializeTransformedObservable(sourceObservable, transformationConfig) {
  // Apply the transformation to the observable using the provided configuration
  const transformedObservable = applyTransformationToObservable(sourceObservable, transformationConfig);

  // Initialize the index property to 0
  transformedObservable.index = 0;

  // Initialize the sibling property to null
  transformedObservable.sibling = null;

  return transformedObservable;
}

module.exports = initializeTransformedObservable;