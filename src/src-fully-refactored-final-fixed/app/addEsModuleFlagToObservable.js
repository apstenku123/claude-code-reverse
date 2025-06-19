/**
 * Adds the __esModule flag to an object and passes isBlobOrFileLikeObject along with the provided observable to of6.
 *
 * @param {any} sourceObservable - The observable or value to be passed to of6.
 * @returns {any} The result of calling of6 with the __esModule flag object and the provided observable.
 */
const addEsModuleFlagToObservable = (sourceObservable) => {
  // Create an object with the __esModule property set to true
  const esModuleFlag = gJ1({}, "__esModule", { value: true });
  // Pass the flag object and the source observable to of6
  return of6(esModuleFlag, sourceObservable);
};

module.exports = addEsModuleFlagToObservable;
