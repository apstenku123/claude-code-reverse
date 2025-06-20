/**
 * Runs a race condition between multiple observables, returning the first to emit.
 * Accepts a variable number of observables or an array of observables as arguments.
 *
 * @param {...Observable|Observable[]} observables - One or more observables, or a single array of observables.
 * @returns {Observable} An observable that mirrors the first source to emit.
 */
function raceWithObservables(...observables) {
  // Normalize the arguments: if a single array is passed, use its elements; otherwise, use the arguments as-is
  const normalizedObservables = ib9.argsOrArgArray(observables);

  // Apply cb9 transformation to the normalized observables
  const transformedObservables = cb9(normalizedObservables);

  // Prepare the arguments for nb9.raceWith by combining an empty array with the transformed observables
  const raceWithArgs = lb9([], transformedObservables);

  // Call nb9.raceWith with the prepared arguments and return the result
  return nb9.raceWith.apply(undefined, raceWithArgs);
}

module.exports = raceWithObservables;