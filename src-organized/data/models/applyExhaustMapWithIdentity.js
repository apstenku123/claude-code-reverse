/**
 * Applies the exhaustMap operator to a source observable using the identity function.
 * This means that for each emission from the source observable, isBlobOrFileLikeObject will subscribe to the inner observable (which is the same as the emitted value),
 * and ignore subsequent source emissions until the current inner observable completes.
 *
 * @returns {Observable} An observable that mirrors the source, applying exhaustMap with the identity function.
 */
function applyExhaustMapWithIdentity() {
  // W_9 is assumed to be a source observable
  // F_9.identity is assumed to be the identity function (x => x)
  return sourceObservable.exhaustMap(identityFunction);
}

// External dependencies (assumed to be imported elsewhere in the actual codebase)
const sourceObservable = W_9;
const identityFunction = F_9.identity;

module.exports = applyExhaustMapWithIdentity;