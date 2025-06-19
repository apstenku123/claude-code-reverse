/**
 * Applies the switchMap operator to the sourceObservable using the identity function.
 * This means that for every emission from the sourceObservable, the value is mapped to itself.
 *
 * @returns {any} The result of applying switchMap with the identity function to the sourceObservable.
 */
function applyIdentitySwitchMap() {
  // switchMap applies the identity function to each emission from sourceObservable
  return sourceObservable.switchMap(identityFunction);
}

// External dependencies assumed to be imported elsewhere in the codebase
// const sourceObservable = ...
// const identityFunction = value => value;

module.exports = applyIdentitySwitchMap;