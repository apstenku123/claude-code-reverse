/**
 * Represents a session for traversing a file system tree with filtering and caching capabilities.
 *
 * @class FileSystemTraversalSession
 * @param {Object} rootDirectory - The root directory object to start traversal from. Must have a 'lastModTime' property.
 * @param {Function} filterFunction - a function to filter files or directories during traversal.
 * @returns {void}
 */
function FileSystemTraversalSession(rootDirectory, filterFunction) {
  /**
   * The root directory object from which traversal begins.
   * @type {Object}
   */
  this.root = rootDirectory;

  /**
   * The filter function applied to each file or directory during traversal.
   * @type {Function}
   */
  this.filter = filterFunction;

  /**
   * The last modification time of the root directory.
   * @type {number}
   */
  this.lastModTime = rootDirectory.lastModTime;

  /**
   * Indicates whether the traversal session is complete.
   * @type {boolean}
   */
  this.done = false;

  /**
   * Cache to store traversal results or intermediate data.
   * @type {Array}
   */
  this.cache = [];

  // Begin traversal immediately upon session creation.
  this.traverse();
}

module.exports = FileSystemTraversalSession;