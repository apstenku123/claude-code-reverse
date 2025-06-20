/**
 * Checks if all elements in the provided array (except the last one) intersect with the last element, using a given configuration.
 *
 * @param {Array<Object>} observables - An array of objects, each expected to have an 'intersects' method.
 * @param {any} config - Configuration or context to be passed to the 'intersects' method.
 * @returns {boolean} True if all elements (except the last) intersect with the last element using the provided config; otherwise, false.
 */
function areAllIntersectingWithReference(observables, config) {
  // Create a shallow copy to avoid mutating the original array
  const observablesCopy = observables.slice();
  // Remove and store the last element as the reference for intersection
  let referenceObservable = observablesCopy.pop();
  let allIntersect = true;

  // Continue checking while all have intersected so far and there are elements left
  while (allIntersect && observablesCopy.length) {
    // Check if every remaining observable intersects with the reference
    allIntersect = observablesCopy.every(currentObservable => {
      return referenceObservable.intersects(currentObservable, config);
    });
    // Update the reference to the next observable (from the end)
    referenceObservable = observablesCopy.pop();
  }

  return allIntersect;
}

module.exports = areAllIntersectingWithReference;