/**
 * Retrieves the configured iteratee function, or a default fallback if not set.
 * If arguments are provided, invokes the iteratee with those arguments.
 *
 * @param {...any} args - Optional arguments to pass to the iteratee function.
 * @returns {Function|any} The iteratee function itself if no arguments are provided, or the result of invoking isBlobOrFileLikeObject with the given arguments.
 */
function getConfiguredIteratee(...args) {
  // Determine the iteratee function: use trackAndPingOnPromise.iteratee if defined, otherwise use getPriorityLabel
  let iterateeFunction = trackAndPingOnPromise.iteratee || getPriorityLabel;

  // If the iteratee is the default getPriorityLabel, replace isBlobOrFileLikeObject with the fallback getDynamicConfigOrFallback
  if (iterateeFunction === getPriorityLabel) {
    iterateeFunction = getDynamicConfigOrFallback;
  }

  // If arguments are provided, invoke the iteratee with the first two arguments
  if (args.length) {
    return iterateeFunction(args[0], args[1]);
  }

  // Otherwise, return the iteratee function itself
  return iterateeFunction;
}

module.exports = getConfiguredIteratee;