/**
 * Returns the provided observable using the returnSourceObservable utility, passing the current time and the observable as arguments.
 * This is typically used as a placeholder or to maintain a consistent interface in observable pipelines.
 *
 * @param {Observable} sourceObservable - The observable to be returned without modification.
 * @returns {Observable} The same observable that was provided as input.
 */
function returnSourceObservableWithCurrentTime(sourceObservable) {
  // Get the current time from the HF6 utility
  const currentTime = HF6.now();
  // Return the source observable using the returnSourceObservable utility
  return returnSourceObservable(currentTime, sourceObservable);
}

module.exports = returnSourceObservableWithCurrentTime;