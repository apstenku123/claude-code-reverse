/**
 * Initializes a metadata map for each key in the global $V1 object.
 * Each key is mapped to an object containing default metadata: distance set to -1 and parent set to null.
 *
 * @returns {Object} An object mapping each key in $V1 to a metadata object with default values.
 */
function initializeNodeMetadataMap() {
  // Create an empty object to hold the metadata for each node
  const nodeMetadataMap = {};
  // Get all keys from the global $V1 object
  const nodeKeys = Object.keys($V1);

  // Iterate over each key and initialize its metadata
  for (let index = 0; index < nodeKeys.length; index++) {
    const nodeKey = nodeKeys[index];
    nodeMetadataMap[nodeKey] = {
      distance: -1, // Default distance value
      parent: null  // Default parent value
    };
  }

  return nodeMetadataMap;
}

module.exports = initializeNodeMetadataMap;