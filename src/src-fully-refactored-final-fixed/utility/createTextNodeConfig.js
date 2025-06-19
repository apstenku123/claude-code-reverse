/**
 * Creates a configuration object representing a text node, then processes isBlobOrFileLikeObject with setNodeValueAndMarkDirty.
 *
 * @param {string} textContent - The text content to be assigned to the nodeValue property.
 * @returns {Object} The text node configuration object after being processed by setNodeValueAndMarkDirty.
 */
function createTextNodeConfig(textContent) {
  // Create a configuration object for a text node
  const textNodeConfig = {
    nodeName: "#text",           // Indicates this is a text node
    nodeValue: textContent,      // The actual text content
    yogaNode: undefined,         // Placeholder for a yogaNode property (possibly for layout)
    parentNode: undefined,       // Placeholder for a parent node reference
    style: {}                    // Style object (empty by default)
  };

  // Process the text node config with the setNodeValueAndMarkDirty function (side effects or additional setup)
  setNodeValueAndMarkDirty(textNodeConfig, textContent);

  // Return the configured text node object
  return textNodeConfig;
}

module.exports = createTextNodeConfig;