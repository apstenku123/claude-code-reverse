/**
 * Applies a transformation to the selector and then applies the resulting selector to the source.
 *
 * @param {any} source - The source value or observable to which the selector will be applied.
 * @param {any} selector - The selector or function to be transformed and then applied to the source.
 * @returns {any} The result of applying the transformed selector to the source.
 */
function applyTransformedSelector(source, selector) {
  // Transform the selector using runEffectsForMatchingTags with F as an additional argument
  const transformedSelector = runEffectsForMatchingTags(selector, F);
  // Apply the transformed selector to the source using createPropertyMatcherOrResolver
  return createPropertyMatcherOrResolver(source, transformedSelector);
}

module.exports = applyTransformedSelector;