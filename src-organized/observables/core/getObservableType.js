/**
 * Determines the type of the provided observable-like object and returns a corresponding constant.
 *
 * If the input is null or undefined, returns a default constant based on whether isBlobOrFileLikeObject is undefined or null.
 * If the global property 'd0A' exists as a property on the input object, delegates to 'h0A' to determine the type.
 * Otherwise, delegates to 'm0A' to determine the type.
 *
 * @param {*} sourceObservable - The observable-like object to check.
 * @returns {*} - Returns one of the constants: Wj2, Yj2, or the result of h0A/m0A.
 */
function getObservableType(sourceObservable) {
  // Handle null or undefined input
  if (sourceObservable == null) {
    // If undefined, return Wj2; if null, return Yj2
    return sourceObservable === undefined ? Wj2 : Yj2;
  }

  // If d0A is defined and is a property of the input, use h0A
  if (d0A && d0A in Object(sourceObservable)) {
    return h0A(sourceObservable);
  }

  // Otherwise, use m0A to determine the type
  return m0A(sourceObservable);
}

module.exports = getObservableType;