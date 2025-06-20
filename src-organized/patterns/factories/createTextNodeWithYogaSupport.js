/**
 * Creates a text node object with Yoga layout support, sets its nodeValue,
 * and marks the nearest Yoga node as dirty to trigger layout updates if necessary.
 *
 * @param {string} textContent - The text content to assign to the nodeValue property.
 * @returns {Object} The constructed text node object with Yoga support and updated nodeValue.
 */
function createTextNodeWithYogaSupport(textContent) {
  // Construct a text node object with default properties
  const textNode = {
    nodeName: "#text",           // Identifies this as a text node
    nodeValue: textContent,      // The actual text content
    yogaNode: undefined,         // Placeholder for Yoga layout node (if any)
    parentNode: undefined,       // Reference to parent node (if any)
    style: {}                    // Style object (can be extended as needed)
  };

  // Set the nodeValue and mark the nearest Yoga node as dirty for layout updates
  setNodeValueAndMarkDirty(textNode, textContent);

  return textNode;
}

module.exports = createTextNodeWithYogaSupport;