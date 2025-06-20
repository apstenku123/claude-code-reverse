/**
 * Merges multiple observables after applying a mapping function to the input arguments.
 *
 * This function takes any number of arguments, applies the Hj9 mapping function to them,
 * then merges the resulting observables using wj9.merge and zj9 utilities.
 *
 * @param {...any} observables - The input observables or values to be mapped and merged.
 * @returns {any} The merged observable resulting from the mapped inputs.
 */
function mergeMappedObservables(...observables) {
  // Apply the Hj9 mapping function to the input observables
  const mappedObservables = Hj9(observables);

  // Use zj9 to prepare the arguments for merging (zj9([], mappedObservables))
  const mergeArgs = zj9([], mappedObservables);

  // Merge the mapped observables using wj9.merge
  return wj9.merge.apply(undefined, mergeArgs);
}

module.exports = mergeMappedObservables;