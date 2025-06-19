/**
 * Creates a text node object with the specified value and updates its nodeValue property.
 * Also marks the nearest Yoga node as dirty to trigger a layout recalculation.
 *
 * @param {string} textValue - The text content to assign to the nodeValue property.
 * @returns {Object} The created text node object with the specified value and updated state.
 */
function createTextNodeWithValue(textValue) {
  // Create a text node object with default properties
  const textNode = {
    nodeName: "#text",
    nodeValue: textValue,
    yogaNode: undefined,
    parentNode: undefined,
    style: {}
  };

  // Update the nodeValue and mark the nearest Yoga node as dirty
  setNodeValueAndMarkDirty(textNode, textValue);

  return textNode;
}

module.exports = createTextNodeWithValue;