/**
 * Initializes a collection of nodes with a single node entry.
 *
 * @param {Object} node - The node object to initialize the collection with. Must have a unique '_nid' property.
 * @returns {void}
 *
 * @example
 * const node = { _nid: 'abc123', ... };
 * const collection = new initializeNodeCollection(node);
 * console.log(collection.nodes); // { abc123: node }
 */
function initializeNodeCollection(node) {
  // Create a new object to store nodes, with no inherited properties
  this.nodes = Object.create(null);
  // Add the provided node to the collection using its unique _nid as the key
  this.nodes[node._nid] = node;
  // Set the length of the collection to 1, since isBlobOrFileLikeObject contains only the provided node
  this.length = 1;
  // Initialize firstNode as undefined (can be set later as needed)
  this.firstNode = undefined;
}

module.exports = initializeNodeCollection;