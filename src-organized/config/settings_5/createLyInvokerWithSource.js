/**
 * Creates a function that invokes the Ly operation with a pre-defined source observable.
 *
 * @param {any} sourceObservable - The source observable or value to be used as the second argument in Ly.
 * @returns {function(any): any} - a function that takes a config parameter and calls Ly with (config, sourceObservable).
 */
function createLyInvokerWithSource(sourceObservable) {
  /**
   * Invokes Ly with the provided config and the pre-defined sourceObservable.
   *
   * @param {any} config - The configuration or input to be passed as the first argument to Ly.
   * @returns {any} - The result of calling Ly with (config, sourceObservable).
   */
  return function invokeLyWithConfig(config) {
    // Call the external Ly function with the provided config and the captured sourceObservable
    return Ly(config, sourceObservable);
  };
}

module.exports = createLyInvokerWithSource;