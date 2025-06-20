/**
 * Represents a session for traversing activities with filtering and caching capabilities.
 * Initializes the traversal process using the provided root activity and filter function/config.
 *
 * @class ActivityTraversalSession
 * @param {Object} rootActivity - The root activity object to start traversal from. Must have a 'lastModTime' property.
 * @param {Function|Object} filterConfig - a filter function or configuration object to control traversal behavior.
 */
function ActivityTraversalSession(rootActivity, filterConfig) {
  /**
   * The root activity object from which traversal begins.
   * @type {Object}
   */
  this.root = rootActivity;

  /**
   * The filter function or configuration for traversal.
   * @type {Function|Object}
   */
  this.filter = filterConfig;

  /**
   * The last modification time of the root activity.
   * @type {number|string|Date}
   */
  this.lastModTime = rootActivity.lastModTime;

  /**
   * Indicates whether the traversal process is completed.
   * @type {boolean}
   */
  this.done = false;

  /**
   * Cache to store traversal results or intermediate data.
   * @type {Array}
   */
  this.cache = [];

  // Begin the traversal process immediately upon instantiation.
  this.traverse();
}

module.exports = ActivityTraversalSession;