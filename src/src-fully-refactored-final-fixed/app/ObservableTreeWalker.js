/**
 * @class ObservableTreeWalker
 * @description
 *   Represents a walker that traverses an observable tree structure, applying a filter and caching results.
 *   On instantiation, isBlobOrFileLikeObject initializes traversal state and immediately starts traversing the tree.
 * @param {Object} rootObservable - The root node or observable object to traverse. Must have a 'lastModTime' property.
 * @param {Object} filterConfig - Configuration or filter to apply during traversal.
 * @returns {ObservableTreeWalker} An instance of ObservableTreeWalker.
 */
function ObservableTreeWalker(rootObservable, filterConfig) {
  /**
   * The root observable node to start traversal from.
   * @type {Object}
   */
  this.root = rootObservable;

  /**
   * The filter or configuration object used during traversal.
   * @type {Object}
   */
  this.filter = filterConfig;

  /**
   * The last modification time of the root observable.
   * @type {any}
   */
  this.lastModTime = rootObservable.lastModTime;

  /**
   * Indicates whether the traversal is complete.
   * @type {boolean}
   */
  this.done = false;

  /**
   * Cache to store traversal results or intermediate data.
   * @type {Array}
   */
  this.cache = [];

  // Immediately begin traversing the observable tree.
  this.traverse();
}

module.exports = ObservableTreeWalker;