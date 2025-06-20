/**
 * Processes the source if isBlobOrFileLikeObject exists by delegating to the processDeletionsAndSubtree function with a specific handler.
 *
 * @param {Function|null} source - The source function or object to check and process.
 * @param {any} context - The context or options to pass to the processDeletionsAndSubtree function.
 * @returns {any} The result of the processDeletionsAndSubtree function if the source exists; otherwise, undefined.
 */
function processIfSourceExists(source, context) {
  // Only process if the source is truthy (not null/undefined/false)
  return source && processDeletionsAndSubtree(source, context, lQ);
}

module.exports = processIfSourceExists;