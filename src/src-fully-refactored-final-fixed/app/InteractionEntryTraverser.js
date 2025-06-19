/**
 * @class InteractionEntryTraverser
 * @description
 * Traverses a source of interaction entries (such as a data tree or observable),
 * applying a filter configuration, and initializes internal state for traversal.
 * Stores the last modification time, a completion flag, and a cache for results.
 * Immediately begins traversal upon instantiation.
 *
 * @param {Object} sourceObservable - The root object or observable containing interaction entries. Must have a 'lastModTime' property.
 * @param {Object} filterConfig - Configuration object specifying filter criteria for traversal.
 *
 * @property {Object} root - The root source of interaction entries.
 * @property {Object} filter - The filter configuration for traversal.
 * @property {number} lastModTime - Timestamp of the last modification in the source.
 * @property {boolean} done - Flag indicating if traversal is complete.
 * @property {Array} cache - Cache for storing traversal results.
 *
 * @returns {InteractionEntryTraverser} An instance initialized and ready for traversal.
 */
function InteractionEntryTraverser(sourceObservable, filterConfig) {
  // Store the root source of interaction entries
  this.root = sourceObservable;
  // Store the filter configuration
  this.filter = filterConfig;
  // Store the last modification time from the source
  this.lastModTime = sourceObservable.lastModTime;
  // Flag to indicate if traversal is complete
  this.done = false;
  // Initialize an empty cache for traversal results
  this.cache = [];
  // Begin traversal immediately upon instantiation
  this.traverse();
}

module.exports = InteractionEntryTraverser;