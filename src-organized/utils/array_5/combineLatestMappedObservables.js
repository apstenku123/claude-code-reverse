/**
 * Combines multiple observables after mapping them through a transformation function.
 *
 * This function takes any number of observable sources as arguments, maps them using the `qP9` function,
 * and then combines them using `LP9.combineLatest`. The combination is performed after applying `MP9` to an empty array
 * and the mapped observables. This is useful for scenarios where you need to combine the latest values from multiple
 * observables after some preprocessing or transformation.
 *
 * @param {...any} observableSources - The observable sources to be combined.
 * @returns {any} The result of combining the latest values from the mapped observables.
 */
function combineLatestMappedObservables(...observableSources) {
  // Map the input observable sources using the transformation function qP9
  const mappedObservables = qP9(observableSources);
  // Combine the mapped observables with an empty array using MP9, then spread the result as arguments to combineLatest
  return LP9.combineLatest(
    ...MP9([], mappedObservables)
  );
}

module.exports = combineLatestMappedObservables;