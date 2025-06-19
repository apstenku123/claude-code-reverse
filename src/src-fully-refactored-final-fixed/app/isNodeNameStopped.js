/**
 * Checks if a given node name (after trimming a suffix) matches any stop node patterns.
 *
 * The function trims the end of the nodeName string by the length of config.textNodeName plus one character,
 * then extracts the last segment after a dot ('.'). It checks if the trimmed node name or its wildcard variant
 * (with the last segment) exists in the stopNodes array.
 *
 * @param {string} nodeName - The full node name to check (e.g., 'foo.bar.baz').
 * @param {Object} config - Configuration object containing stopNodes and textNodeName.
 * @param {string[]} config.stopNodes - Array of node names or wildcard patterns to match against.
 * @param {string} config.textNodeName - Suffix to trim from nodeName before matching.
 * @returns {boolean} True if the node name matches any stop node pattern, otherwise false.
 */
function isNodeNameStopped(nodeName, config) {
  // Remove the textNodeName suffix and one extra character (usually a dot)
  const trimmedNodeName = nodeName.substr(0, nodeName.length - config.textNodeName.length - 1);

  // Extract the last segment after the last dot
  const lastSegment = trimmedNodeName.substr(trimmedNodeName.lastIndexOf(".") + 1);

  // Check if the trimmed node name or its wildcard variant exists in stopNodes
  for (const stopNode of config.stopNodes) {
    if (stopNode === trimmedNodeName || stopNode === `*.${lastSegment}`) {
      return true;
    }
  }
  return false;
}

module.exports = isNodeNameStopped;