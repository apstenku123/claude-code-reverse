/**
 * @class InteractionEntryProcessor
 * @classdesc
 *   Initializes an interaction entry processor that traverses a source observable,
 *   applies a filter configuration, and manages a cache of processed entries.
 *   Stores the last modification time and provides a traversal method.
 *
 * @param {Object} sourceObservable - The root observable or data source to process. Must have a 'lastModTime' property.
 * @param {Object} filterConfig - Configuration or filter to apply during traversal.
 *
 * @property {Object} root - The root observable or data source.
 * @property {Object} filter - The filter configuration.
 * @property {number} lastModTime - The last modification time from the source observable.
 * @property {boolean} done - Indicates if processing is complete.
 * @property {Array} cache - Stores processed entries.
 *
 * @returns {void}
 */
function InteractionEntryProcessor(sourceObservable, filterConfig) {
  /**
   * The root observable or data source to process.
   * @type {Object}
   */
  this.root = sourceObservable;

  /**
   * The filter configuration to apply during traversal.
   * @type {Object}
   */
  this.filter = filterConfig;

  /**
   * The last modification time from the source observable.
   * @type {number}
   */
  this.lastModTime = sourceObservable.lastModTime;

  /**
   * Indicates if the traversal/processing is complete.
   * @type {boolean}
   */
  this.done = false;

  /**
   * Cache for storing processed entries.
   * @type {Array}
   */
  this.cache = [];

  // Begin traversal of the source observable with the provided filter.
  this.traverse();
}

module.exports = InteractionEntryProcessor;