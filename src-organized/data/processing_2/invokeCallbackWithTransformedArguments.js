/**
 * Invokes the provided callback function with transformed arguments.
 *
 * This utility function calls the callbackFunction with the following arguments:
 *   1. staticValue
 *   2. The result of transformFunction(primaryValue)
 *   3. If configValue is provided, the result of transformFunction(configValue), otherwise undefined
 *   4. If sourceValue is provided, the result of transformFunction(sourceValue), otherwise undefined
 *
 * @param {Function} callbackFunction - The function to be invoked with the transformed arguments.
 * @param {Function} transformFunction - The function used to transform each argument before passing to the callback.
 * @param {*} staticValue - a static value to be passed as the first argument to the callback.
 * @param {*} primaryValue - The primary value to be transformed and passed to the callback.
 * @param {*} [configValue] - Optional configuration value to be transformed and passed to the callback.
 * @param {*} [sourceValue] - Optional source value to be transformed and passed to the callback.
 * @returns {void}
 */
function invokeCallbackWithTransformedArguments(
  callbackFunction,
  transformFunction,
  staticValue,
  primaryValue,
  configValue,
  sourceValue
) {
  // Transform primaryValue
  const transformedPrimary = transformFunction(primaryValue);

  // Transform configValue if provided, otherwise undefined
  const transformedConfig = configValue ? transformFunction(configValue) : undefined;

  // Transform sourceValue if provided, otherwise undefined
  const transformedSource = sourceValue ? transformFunction(sourceValue) : undefined;

  // Invoke the callback with all transformed arguments
  callbackFunction(staticValue, transformedPrimary, transformedConfig, transformedSource);
}

module.exports = invokeCallbackWithTransformedArguments;