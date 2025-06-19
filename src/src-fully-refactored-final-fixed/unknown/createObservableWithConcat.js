/**
 * Creates a function that, when given an observable, returns a new observable
 * by concatenating the provided source observables and a new observable created
 * from the provided arguments.
 *
 * @param {...any} sourceObservables - The source observables to be concatenated.
 * @returns {function(any): any} a function that takes an observable and returns the concatenated observable.
 */
function createObservableWithConcat(...sourceObservables) {
  /**
   * Concatenates the provided observable with the source observables and a new observable
   * created from the arguments passed to the outer function.
   *
   * @param {any} inputObservable - The observable to concatenate with the sources.
   * @returns {any} The concatenated observable.
   */
  return function (inputObservable) {
    // eS9([], tS9(sourceObservables)) creates a new observable from the arguments
    // A_9.concat concatenates inputObservable with the new observable
    return A_9.concat(
      inputObservable,
      B_9.of.apply(
        void 0,
        eS9([], tS9(sourceObservables))
      )
    );
  };
}

module.exports = createObservableWithConcat;