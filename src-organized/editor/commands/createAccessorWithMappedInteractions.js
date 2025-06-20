/**
 * Creates an accessor function by mapping user interactions to route names and combining them with the provided arguments.
 *
 * This utility function sets up the necessary context and arguments for creating an accessor function that processes
 * user interaction entries, maps them to route names, and applies the accessor logic with the correct context and arguments.
 *
 * @param {any} userInteractionEntries - The array or value representing user interaction entries to be mapped and processed.
 * @returns {any} The result of invoking the accessor function with the mapped interactions and provided arguments.
 */
function createAccessorWithMappedInteractions(userInteractionEntries) {
  // Save references to the current context and the accessor function creator
  const currentMappedInteractions = mapInteractionsToRouteNames;
  const accessorFunctionCreator = createAccessorFunction;

  // Reset the mapping and accessor function creator to their default states
  mapInteractionsToRouteNames = createAccessorFunction = sourceObservable;

  // Store the provided user interaction entries for processing
  mappedInteractionArguments = userInteractionEntries;

  // Create the accessor with the mapped interactions and arguments
  const accessorWithArguments = createAccessorWithArguments.apply(accessorFunctionCreator, currentMappedInteractions);

  // Return the accessor result
  return accessorWithArguments;
}

module.exports = createAccessorWithMappedInteractions;
