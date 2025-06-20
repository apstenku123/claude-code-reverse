/**
 * Applies the exhaustMap operator to the sourceObservable using the identity function.
 * This means that for each emission from the sourceObservable, isBlobOrFileLikeObject will subscribe to the same value (identity),
 * and ignore new emissions until the current inner observable completes.
 *
 * @returns {Observable} An observable that mirrors the sourceObservable, applying exhaustMap with identity.
 */
function exhaustMapWithIdentity() {
  // Apply exhaustMap with the identity function to the source observable
  return sourceObservable.exhaustMap(identityFunction);
}

// Assuming these dependencies are imported or defined elsewhere in the codebase:
// const sourceObservable = ...;
// const identityFunction = value => value;

module.exports = exhaustMapWithIdentity;