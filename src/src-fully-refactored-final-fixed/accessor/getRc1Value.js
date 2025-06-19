/**
 * Retrieves the rc1 value from the provided source observable.
 *
 * @param {Object} sourceObservable - The observable object to access the rc1 value from.
 * @returns {*} The rc1 value from the source observable, or undefined if not present.
 */
function getRc1Value(sourceObservable) {
  // Return the rc1 property if isBlobOrFileLikeObject exists on the sourceObservable
  return sourceObservable && sourceObservable.rc1;
}

module.exports = getRc1Value;