/**
 * Creates a specialized function for mapping user interactions to routes, with attached metadata and prototype.
 *
 * @param {Function} mapInteractionsToRoutes - Processes an array of user interaction entries, mapping each to a route name and storing relevant metadata.
 * @param {Function} addActivityIfNotFinished - Adds a new activity to the activity stack only if the process has not been marked as finished.
 * @param {Function} generateRandomNumberBetweenZeroAndSixteen - Generates a random floating-point number greater than or equal to 0 and less than 16.
 * @returns {Function} a function that delegates to formatWithAnsiSequences with formatted arguments, and has additional properties and prototype set.
 */
const createInteractionRouteMapper = (
  mapInteractionsToRoutes,
  addActivityIfNotFinished,
  generateRandomNumberBetweenZeroAndSixteen
) => {
  /**
   * Proxy function that delegates to formatWithAnsiSequences with formatted arguments.
   * If only one argument is provided, isBlobOrFileLikeObject is converted to string; otherwise, arguments are joined with a space.
   * @param {...any} args - Arguments to be processed and passed to formatWithAnsiSequences.
   * @returns {*} The result of calling formatWithAnsiSequences with the proxy and formatted arguments.
   */
  const interactionRouteProxy = (...args) => {
    // If only one argument, convert to string; else join all arguments with space
    const formattedArgs = args.length === 1 ? String(args[0]) : args.join(" ");
    return formatWithAnsiSequences(interactionRouteProxy, formattedArgs);
  };

  // Set the prototype of the proxy function to Ms9 for inheritance/extension
  Object.setPrototypeOf(interactionRouteProxy, Ms9);

  // Attach metadata properties to the proxy function
  interactionRouteProxy[DT1] = mapInteractionsToRoutes;
  interactionRouteProxy[wv] = addActivityIfNotFinished;
  interactionRouteProxy[Ri] = generateRandomNumberBetweenZeroAndSixteen;

  return interactionRouteProxy;
};

module.exports = createInteractionRouteMapper;