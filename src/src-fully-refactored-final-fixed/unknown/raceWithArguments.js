/**
 * Executes the 'raceWith' method from the 'nb9' object using the provided arguments.
 * This function collects all arguments into an array, ensures they are formatted as an array
 * (using ib9.argsOrArgArray), processes them with cb9, then wraps them with lb9,
 * and finally applies them to nb9.raceWith.
 *
 * @param {...any} sources - One or more source observables or values to race.
 * @returns {any} The result of invoking nb9.raceWith with the processed arguments.
 */
function raceWithArguments(...sources) {
  // Ensure the arguments are in array form (handles single or multiple sources)
  const sourcesArray = ib9.argsOrArgArray(sources);

  // Process the sources array with cb9 (could be a transformation or validation)
  const processedSources = cb9(sourcesArray);

  // Wrap the processed sources with lb9 (could be for further transformation or context)
  const wrappedSources = lb9([], processedSources);

  // Call nb9.raceWith with the wrapped sources using apply to spread the arguments
  return nb9.raceWith.apply(undefined, wrappedSources);
}

module.exports = raceWithArguments;