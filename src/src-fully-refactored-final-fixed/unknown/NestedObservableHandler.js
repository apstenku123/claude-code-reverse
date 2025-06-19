/**
 * Handles the initialization of a nested observable handler by invoking the parent constructor
 * and setting up properties for nested observables.
 *
 * @class NestedObservableHandler
 * @extends Tg1
 *
 * @param {Observable} sourceObservable - The source observable to be handled.
 * @param {Object} config - Configuration options for the handler.
 */
function NestedObservableHandler(sourceObservable, config) {
  // Call the parent constructor with the provided observable and config
  Tg1.call(this, sourceObservable, config);

  /**
   * Holds a reference to a nested observable, if any.
   * @type {Observable|undefined}
   */
  this.nestedObservable = undefined;

  /**
   * Holds an array of nested observables, if any.
   * @type {Observable[]|null}
   */
  this.nestedObservableArray = null;
}

module.exports = NestedObservableHandler;