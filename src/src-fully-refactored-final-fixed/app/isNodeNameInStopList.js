/**
 * Checks if a processed node name matches any entry in a list of stop nodes.
 * The function trims the node name based on the provided config, extracts the last segment,
 * and checks for an exact or wildcard match in the stopNodes array.
 *
 * @param {string} nodeName - The full node name to check (e.g., 'foo.bar.baz').
 * @param {Object} config - Configuration object containing stopNodes and textNodeName.
 * @param {string[]} config.stopNodes - Array of node names or wildcard patterns to match against.
 * @param {string} config.textNodeName - The text node name to trim from the end of nodeName.
 * @returns {boolean} True if the processed node name matches any stop node or wildcard, false otherwise.
 */
function isNodeNameInStopList(nodeName, config) {
  // Remove the textNodeName and a separator from the end of nodeName
  const trimmedNodeName = nodeName.substr(0, nodeName.length - config.textNodeName.length - 1);
  // Extract the last segment after the final '.'
  const lastSegment = trimmedNodeName.substr(trimmedNodeName.lastIndexOf(".") + 1);

  // Check for exact match or wildcard match in stopNodes
  for (const stopNode of config.stopNodes) {
    if (stopNode === trimmedNodeName || stopNode === `*.${lastSegment}`) {
      return true;
    }
  }
  return false;
}

module.exports = isNodeNameInStopList;