/**
 * Combines the current timestamp with a provided observable using the returnSourceObservable function.
 *
 * @param {Observable} sourceObservable - The observable to combine with the current timestamp.
 * @returns {any} The result of combining the current timestamp with the source observable using returnSourceObservable.
 */
function combineCurrentTimeWithObservable(sourceObservable) {
  // Get the current timestamp using HF6.now()
  const currentTimestamp = HF6.now();
  // Combine the current timestamp with the source observable using returnSourceObservable
  return returnSourceObservable(currentTimestamp, sourceObservable);
}

module.exports = combineCurrentTimeWithObservable;