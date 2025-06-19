/**
 * Retrieves the computed width and height from a given object'createInteractionAccessor yogaNode property.
 *
 * @param {Object} element - The object containing a yogaNode property.
 * @param {Object} [element.yogaNode] - The yogaNode instance with layout methods.
 * @returns {{ width: number, height: number }} An object with the computed width and height. Returns 0 for each if yogaNode or its methods are unavailable.
 */
function getYogaNodeDimensions(element) {
  // Attempt to retrieve the computed width from yogaNode, default to 0 if unavailable
  const width = element.yogaNode?.getComputedWidth() ?? 0;
  // Attempt to retrieve the computed height from yogaNode, default to 0 if unavailable
  const height = element.yogaNode?.getComputedHeight() ?? 0;

  return {
    width,
    height
  };
}

module.exports = getYogaNodeDimensions;
