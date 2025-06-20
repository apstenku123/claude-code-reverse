/**
 * ObservableMethodManager constructor.
 *
 * This class is responsible for initializing an observable with a given configuration,
 * and setting up a methods registry for further extension. It calls the parent constructor (iL)
 * with the provided observable source and configuration, then initializes its own methods storage.
 *
 * @class ObservableMethodManager
 * @param {Object} sourceObservable - The source observable to be managed.
 * @param {Object} config - Configuration options for the observable.
 * @returns {void}
 */
function ObservableMethodManager(sourceObservable, config) {
  // Call the parent constructor with the observable and configuration
  iL.call(this, sourceObservable, config);

  // Initialize an empty object to store custom methods
  this.methods = {};

  // Internal cache for methods as an array (null until populated)
  this._methodsArray = null;
}

module.exports = ObservableMethodManager;