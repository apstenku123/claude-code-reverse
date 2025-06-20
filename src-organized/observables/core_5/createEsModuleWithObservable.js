/**
 * Enhances the provided observable (or module) by marking isBlobOrFileLikeObject as an ES module and passing isBlobOrFileLikeObject to a processing function.
 *
 * @function createEsModuleWithObservable
 * @param {any} sourceObservable - The observable or module to be enhanced and processed.
 * @returns {any} The result of processing the enhanced module/observable.
 */
const createEsModuleWithObservable = (sourceObservable) => {
  // Create a new object with __esModule: true and all properties from sourceObservable
  const esModuleObject = R81(
    {},
    "__esModule",
    { value: true }
  );

  // Pass the enhanced object and the original observable/module to copyPropertiesExcludingKey for further processing
  return copyPropertiesExcludingKey(esModuleObject, sourceObservable);
};

module.exports = createEsModuleWithObservable;
