/**
 * Applies the 'extractDateFromSource' function (bound to a selected context) to each item in the provided arguments.
 *
 * The context for binding is determined by the first argument if isBlobOrFileLikeObject is truthy; otherwise,
 * isBlobOrFileLikeObject searches the rest of the arguments for the first object-type value to use as context.
 *
 * @param {any} possibleContext - The primary context to bind to 'extractDateFromSource', or null/undefined to search for one in 'items'.
 * @param {...any} items - The items to process with the bound 'extractDateFromSource' function.
 * @returns {any[]} An array containing the results of applying the bound 'extractDateFromSource' function to each item.
 */
function mapWithBoundFunction(possibleContext, ...items) {
  // Determine the context to bind: use possibleContext if truthy, otherwise find the first object in items
  const bindingContext = possibleContext || items.find(item => typeof item === "object");
  // Create a version of 'extractDateFromSource' bound to the selected context
  const boundUuFunction = extractDateFromSource.bind(null, bindingContext);
  // Apply the bound function to each item in the items array
  return items.map(boundUuFunction);
}

module.exports = mapWithBoundFunction;
