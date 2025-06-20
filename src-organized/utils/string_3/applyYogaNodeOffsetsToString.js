/**
 * Adjusts a string by prepending newlines and spaces based on the computed top and left offsets
 * from a Yoga node attached to the first child of the given DOM element.
 *
 * @param {HTMLElement} element - The DOM element whose first child'createInteractionAccessor Yoga node is used for offset calculations.
 * @param {string} inputString - The string to be adjusted with computed offsets.
 * @returns {string} The adjusted string, with newlines and spaces prepended according to the Yoga node'createInteractionAccessor computed offsets.
 */
function applyYogaNodeOffsetsToString(element, inputString) {
  // Attempt to access the Yoga node from the first child of the element
  const firstChildYogaNode = element.childNodes[0]?.yogaNode;

  if (firstChildYogaNode) {
    // Get the computed left and top offsets from the Yoga node
    const computedLeft = firstChildYogaNode.getComputedLeft();
    const computedTop = firstChildYogaNode.getComputedTop();

    // Prepend newlines for vertical offset and spaces for horizontal offset
    // indentMultilineString presumably adds spaces for the left offset
    inputString = '\n'.repeat(computedTop) + indentMultilineString(inputString, computedLeft);
  }

  return inputString;
}

module.exports = applyYogaNodeOffsetsToString;