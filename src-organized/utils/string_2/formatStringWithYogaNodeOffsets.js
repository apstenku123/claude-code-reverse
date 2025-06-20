/**
 * Formats a string by prepending line breaks and spaces based on the computed top and left offsets
 * from a Yoga node attached to the first child of the given DOM element.
 *
 * @param {HTMLElement} element - The DOM element whose first child'createInteractionAccessor Yoga node is used for offset calculations.
 * @param {string} inputString - The string to be formatted with offsets.
 * @returns {string} The formatted string with line breaks and spaces according to the Yoga node'createInteractionAccessor computed offsets.
 */
function formatStringWithYogaNodeOffsets(element, inputString) {
  // Attempt to access the Yoga node from the first child of the element
  const yogaNode = element.childNodes[0]?.yogaNode;

  if (yogaNode) {
    // Get the computed left and top offsets from the Yoga node
    const computedLeft = yogaNode.getComputedLeft();
    const computedTop = yogaNode.getComputedTop();

    // Prepend line breaks based on the top offset, and spaces based on the left offset
    // indentMultilineString is assumed to add spaces (or similar) for indentation
    inputString = '\n'.repeat(computedTop) + indentMultilineString(inputString, computedLeft);
  }

  return inputString;
}

module.exports = formatStringWithYogaNodeOffsets;