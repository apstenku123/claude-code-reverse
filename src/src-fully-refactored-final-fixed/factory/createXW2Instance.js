/**
 * Factory function to create a new xW2 instance using the provided source observable.
 *
 * @function createXW2Instance
 * @category factory
 * @param {Observable} sourceObservable - The observable containing interaction entries to be processed.
 * @returns {xW2} a new instance of xW2 initialized with the given source observable.
 */
function createXW2Instance(sourceObservable) {
  // Instantiate and return a new xW2 object with the provided source observable
  return new xW2(sourceObservable);
}

module.exports = createXW2Instance;