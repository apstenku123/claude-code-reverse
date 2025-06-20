/**
 * Invokes the callback function with a set of transformed parameters.
 *
 * This utility function calls the provided callback (C2) with the following arguments:
 *   - The callback reference (callbackFunction)
 *   - The result of transforming the primary parameter (transformFunction(primaryParam))
 *   - The result of transforming the config parameter if isBlobOrFileLikeObject exists, otherwise undefined
 *   - The result of transforming the source parameter if isBlobOrFileLikeObject exists, otherwise undefined
 *
 * @param {Function} callbackFunction - The callback to invoke (originally CC5).
 * @param {*} primaryParam - The primary parameter to be transformed and passed (originally initializeSyntaxHighlighting).
 * @param {*} configParam - Optional configuration parameter to be transformed and passed (originally b).
 * @param {*} sourceParam - Optional source parameter to be transformed and passed (originally a).
 * @param {Function} transformFunction - Function to transform each parameter before passing (originally convertCharCodeArrayToString).
 * @returns {void}
 */
function invokeCallbackWithTransformedParams(callbackFunction, primaryParam, configParam, sourceParam, transformFunction) {
  // Transform each parameter as required and pass to the callback
  callbackFunction(
    callbackFunction,
    transformFunction(primaryParam),
    configParam ? transformFunction(configParam) : undefined,
    sourceParam ? transformFunction(sourceParam) : undefined
  );
}

module.exports = invokeCallbackWithTransformedParams;