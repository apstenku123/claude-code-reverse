/**
 * Adjusts a string by prepending line breaks and spaces based on a DOM node'createInteractionAccessor Yoga layout offsets.
 *
 * If the first child of the given parent element has a Yoga node, this function retrieves its computed
 * top and left offsets. It then prepends the specified string with a number of line breaks equal to the
 * top offset, and indents the string by the left offset using the indentMultilineString utility.
 *
 * @param {HTMLElement} parentElement - The parent DOM element whose first child'createInteractionAccessor Yoga node is used for offset.
 * @param {string} inputString - The string to be adjusted based on the Yoga node'createInteractionAccessor computed offsets.
 * @returns {string} The adjusted string with line breaks and indentation applied.
 */
function applyYogaNodeOffsetToString(parentElement, inputString) {
  // Attempt to access the Yoga node from the first child of the parent element
  const firstChildYogaNode = parentElement.childNodes[0]?.yogaNode;

  if (firstChildYogaNode) {
    // Retrieve computed left and top offsets from the Yoga node
    const computedLeft = firstChildYogaNode.getComputedLeft();
    const computedTop = firstChildYogaNode.getComputedTop();

    // Prepend line breaks for vertical offset and indent the string for horizontal offset
    inputString = '\n'.repeat(computedTop) + indentMultilineString(inputString, computedLeft);
  }

  return inputString;
}

module.exports = applyYogaNodeOffsetToString;