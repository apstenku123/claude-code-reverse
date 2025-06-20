/**
 * @class ObservableFilterTraversal
 * @description
 *   Represents a traversal operation over an observable data source with an optional filter configuration.
 *   Initializes internal state, including a cache and last modification time, and begins traversal immediately.
 *
 * @param {Object} sourceObservable - The root observable object to traverse. Must have a 'lastModTime' property.
 * @param {Object} filterConfig - Configuration object used to filter items during traversal.
 *
 * @property {Object} root - The root observable object being traversed.
 * @property {Object} filter - The filter configuration object.
 * @property {number|Date} lastModTime - The last modification time of the root observable.
 * @property {boolean} done - Indicates if the traversal is complete.
 * @property {Array} cache - Stores traversal results or intermediate data.
 *
 * @returns {ObservableFilterTraversal} An instance of ObservableFilterTraversal.
 */
function ObservableFilterTraversal(sourceObservable, filterConfig) {
  // Assign the root observable object
  this.root = sourceObservable;
  // Assign the filter configuration
  this.filter = filterConfig;
  // Store the last modification time from the root observable
  this.lastModTime = sourceObservable.lastModTime;
  // Indicates if the traversal is complete
  this.done = false;
  // Initialize an empty cache for traversal results
  this.cache = [];
  // Begin the traversal process (assumes a traverse method is defined on the prototype)
  this.traverse();
}

module.exports = ObservableFilterTraversal;