/**
 * Reverses the array of configuration objects produced by combineWithEmptyArray,
 * and for each object, replaces its `code` property with the value of its `endCode` property.
 *
 * @param {Observable<any>} sourceObservable - The observable to combine with an empty array.
 * @returns {Array<Object>} An array of configuration objects, reversed, with `code` set to `endCode`.
 */
function reverseAndMapEndCode(sourceObservable) {
  // Combine the source observable with an empty array using combineWithEmptyArray utility
  // Then reverse the resulting array and map each object to set code = endCode
  return combineWithEmptyArray(sourceObservable)
    .reverse()
    .map(config => ({
      ...config,
      code: config.endCode
    }));
}

module.exports = reverseAndMapEndCode;