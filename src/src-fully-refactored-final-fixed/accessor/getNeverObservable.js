/**
 * Returns the 'NEVER' observable from the KNA module.
 * This observable never emits any items and never completes.
 *
 * @returns {Observable} An observable that never emits and never completes.
 */
function getNeverObservable() {
  // Return the 'NEVER' observable from the KNA module
  return KNA.NEVER;
}

module.exports = getNeverObservable;