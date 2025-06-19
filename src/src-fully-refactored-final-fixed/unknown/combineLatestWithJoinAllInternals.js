/**
 * Combines the provided observable source using the joinAllInternals method with the combineLatest strategy.
 *
 * @param {any} sourceObservable - The observable or data source to be combined.
 * @returns {any} The result of combining the source using joinAllInternals with combineLatest.
 */
function combineLatestWithJoinAllInternals(sourceObservable) {
  // Use joinAllInternals from VP9 with combineLatest strategy from CP9
  return VP9.joinAllInternals(CP9.combineLatest, sourceObservable);
}

module.exports = combineLatestWithJoinAllInternals;