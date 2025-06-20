/**
 * Iterates over the specified property keys of a source object, applies a transformation function to each property,
 * and accumulates the filtered results into a new object. The transformation is performed using the Op function.
 *
 * @param {Object} sourceObject - The object whose properties will be processed.
 * @param {Array<string>} propertyKeys - An array of property keys to process from the source object.
 * @returns {Object} a new object containing the transformed and filtered properties.
 */
function filterAndTransformObjectProperties(sourceObject, propertyKeys) {
  return processAndFilterProperties(
    sourceObject,
    propertyKeys,
    /**
     * Transformation callback applied to each property key.
     * @param {Object} currentObject - The current state of the result object (not used here).
     * @param {string} propertyKey - The property key being processed.
     * @returns {*} The result of the Op transformation for the given property key.
     */
    function (_currentObject, propertyKey) {
      // Apply the Op transformation to the source object and property key
      return Op(sourceObject, propertyKey);
    }
  );
}

module.exports = filterAndTransformObjectProperties;